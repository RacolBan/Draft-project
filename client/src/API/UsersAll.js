import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { GlobalState } from "../GlobalState";

function UsersAll() {
  const state = useContext(GlobalState);
  const [isAdmin, setIsAdmin] = state.UserAPI.isAdmin;
  const login = JSON.parse(localStorage.getItem("login")) || null;
  const [usersAll, setUsersAll] = useState([]);
  const getUsers = async () => {
    const { data } = await axios.get(`http://localhost:8000/user/getAll`, {
      headers: { "access-token": "Bearer " + login.accesstoken },
    });
    setUsersAll(data);
  };
  useEffect(() => {
    if (isAdmin) {
      getUsers();
    }
  }, [isAdmin]);
  return {
    usersAll: [usersAll, setUsersAll],
  };
}

export default UsersAll;
