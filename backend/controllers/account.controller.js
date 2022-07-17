var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { AccountModel } = require("../models");
// const sendMail = require('../service/email.service');

// require("dotenv").config();
// // send email to notify
// await sendMail(
//     `${email}`,
//     `Congratulation! the account of ${username} has created!`,
//     "You has created successfully an account in HOCMAI"
// )
const createAccessToken = (account) => {
  return jwt.sign(account, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};
const createRefreshToken = (account) => {
  return jwt.sign(account, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

const register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const found = await AccountModel.findOne({
      where: {
        username,
      },
    });

    if (found) return res.status(409).json({ message: "username has existed" });

    // validate password
    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: "Password is at least 6 characters long." });

    //password Encryption
    const passwordHash = await bcrypt.hash(password, 10);

    const account = {
      username: username,
      hashPwd: passwordHash,
      role,
    };

    // save data
    const newAccount = await AccountModel.create(account);



    if (!newAccount) {
      return res
        .status(400)
        .json({ message: "create new Account unsuccesfully" });
    }
    const accesstoken = createAccessToken({ id: newAccount.id });
    const refreshtoken = createRefreshToken({ id: newAccount.id });

    res.cookie("refreshtoken", refreshtoken, {
      httpOnly: true,
      path: "/account/refresh_token",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
    });

    res.status(201).json({ newAccount, accesstoken });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const account = await AccountModel.findOne({
      where: {
        username,
      },
    });

    if (!account) return res.status(400).json({ msg: "User does not exist." });

    // Compare encrypted password with hash_pwd (true)
    const isMatch = await bcrypt.compare(password, account.hashPwd);

    if (!isMatch) return res.status(400).json({ msg: "Incorrect password." });

    // If login success , create access token and refresh token
    const accesstoken = createAccessToken({ id: account.id });
    const refreshtoken = createRefreshToken({ id: account.id });

    // create refreshtoken cookie
    res.cookie("refreshtoken", refreshtoken, {
      httpOnly: true,
      path: "/account/refresh_token",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
    });

    res.json({
      msg: "login successful",
      accesstoken,
      id: account.id,
    });

  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("refreshtoken", { path: "/account/refresh_token" });
    console.log(req.cookies);
    return res.json({ msg: "Logged out" });

  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const refreshToken = async (req, res) => {
  try {
    const rf_token = req.cookies.refreshtoken;

    if (!rf_token) return res.status(400).json({ msg: "Please register or login" })

    jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, account) => {
      if (err) return res.status(400).json({ msg: "Please register or login" })

      const accessToken = createAccessToken({ id: account.id })
      res.json({ accessToken, account })
    })

  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  refreshToken,
};
