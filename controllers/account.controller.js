var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { AccountModel, UserModel } = require("../models");
const sendMail = require('../services/email.service');


const createAccessToken = (account) => {
  return jwt.sign(account, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};
const createTempAccessToken = (account) => {
  return jwt.sign(account, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};
const createRefreshToken = (account) => {
  return jwt.sign(account, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const found = await AccountModel.findOne({
      where: {
        username,
      },
    });

    if (found) {
      return res.status(409).json({ message: "username has existed" });
    }
    // validate password
    if (password.length < 6) {
      return res.status(400).json({ message: "Password is at least 6 characters long." })
    };

    //password Encryption
    const passwordHash = await bcrypt.hash(password, 10);

    const account = {
      username: username,
      hashPwd: passwordHash,

    };

    // save data
    const newAccount = await AccountModel.create(account);

    delete newAccount.dataValues.hashPwd;

    if (!newAccount) {
      return res.status(400).json({ message: "create new Account unsuccesfully" });
    }
    const accesstoken = createAccessToken({ id: newAccount.id });
    const refreshtoken = createRefreshToken({ id: newAccount.id });

    res.cookie("refreshtoken", refreshtoken, {
      httpOnly: true,
      path: "/account/refresh_token",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
    });

    return res.status(201).json({ newAccount, accesstoken });
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

    if (!account) return res.status(400).json({ message: "Account does not exist." });

    // Compare encrypted password with hash_pwd (true)
    const isMatch = await bcrypt.compare(password, account.hashPwd);

    if (!isMatch) return res.status(400).json({ message: "Incorrect password." });

    // If login success , create access token and refresh token
    const accesstoken = createAccessToken({ id: account.id });
    const refreshtoken = createRefreshToken({ id: account.id });

    // create refreshtoken cookie
    res.cookie("refreshtoken", refreshtoken, {
      httpOnly: true,
      path: "/account/refresh_token",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
    });



    return res.status(200).json({
      message: "login successful",
      accesstoken,
      id: account.id,
      username: account.username,
      role: account.role,
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("refreshtoken", { path: "/account/refresh_token" });
    console.log(req.cookies);
    return res.json({ message: "Logged out" });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const refreshToken = async (req, res) => {
  try {
    const rf_token = req.cookies.refreshtoken;

    if (!rf_token) {
      return res.status(400).json({ message: "Please register or login" })
    }

    jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, account) => {
      if (err) return res.status(400).json({ message: "Please register or login" })

      const accessToken = createAccessToken({ id: account.id })
      res.json({ accessToken, account })
    })

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { accountId: id } = req.params;
    const { password, newPassword } = req.body;

    const foundAccount = await AccountModel.findByPk(id);


    if (!foundAccount) {
      return res.status(404).json({ message: "Not Found Account" })
    };

    const isMatch = await bcrypt.compare(password, foundAccount.dataValues.hashPwd);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password." });
    }
    const newPassHash = await bcrypt.hash(newPassword, 10);

    await AccountModel.update({ hashPwd: newPassHash }, {
      where: {
        id
      }
    });

    res.json({ message: "updated password successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });

  }

}

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {

    const found = await UserModel.findOne({
      where: {
        email
      }
    })
    // make sure email existed in database
    if (!found) {
      return res.status(404).json({ message: "email no longer existed " })
    }

    const payload = {
      email: found.email,
      id: found.accountId
    }

    const tempToken = createTempAccessToken(payload);

    // create link just only exist 15min by token
    const link = `http://localhost:8000/reset_password/${found.accountId}/${tempToken}`

    // send email to notify
    await sendMail(
      `${email}`,
      `Give you link to reset password`,
      `Kick this link:${link} to reset password page `
    )

    return res.json("password reset has been sent ur email")
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

}

const resetPassword = async (req, res) => {
  const { accountId: id } = req.params;
  const { newPassword, confirmPassword } = req.body;

  try {


    // validate newPassword and confirmPassword should match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "two password not match" })
    }

    // password Encryption
    const passwordHash = await bcrypt.hash(newPassword, 10);

    // update newPassword for account
    await AccountModel.update({ hashPwd: passwordHash }, {
      where: {
        id
      }
    });

    return res.status(200).json({ message: "reset password successfully" })

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

}


module.exports = {
  register,
  login,
  logout,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword
};
