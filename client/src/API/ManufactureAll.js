import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { GlobalState } from "../GlobalState";

function ManufactureAll() {
  const state = useContext(GlobalState);
  const [isAdmin, setIsAdmin] = state.UserAPI.isAdmin;
  const login = JSON.parse(localStorage.getItem("login")) || null;
  const [manufactureAll, setManufactureAll] = useState([]);
  const getManufacture = async () => {
    const { data } = await axios.get("http://localhost:8000/api/manufacture", {
      headers: { "access-token": "Bearer " + login.accesstoken },
    });
    setManufactureAll(data);
  };
  useEffect(() => {
    if (isAdmin) {
      getManufacture();
    }
  }, [isAdmin]);
  return {
    manufactureAll: [manufactureAll, setManufactureAll]
  };
}

export default ManufactureAll;
