import axios from "axios";
import React, { useEffect, useState } from "react";

function UserAPI() {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  let login = localStorage.getItem("login");
  login = JSON.parse(login);
  const getUser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/user/${login.accountId}/getInfor`,
        { headers: { "access-token": login.accesstoken } }
      );
      setIsLogged(true)
    } catch (error) {
      alert(error.response.message)
    }
  };
  useEffect(() => {
    if (login) {
      setIsLogged(true);
    }
  }, [login]);
  useEffect(() => {
    if (login) {
      getUser(login);
    }
  }, []);

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
  };
}

export default UserAPI;
