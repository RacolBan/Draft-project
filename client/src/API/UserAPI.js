import axios from "axios";
import {useEffect, useState } from "react";

function UserAPI() {
  const [isLogged, setIsLogged] = useState(false);
  let login = localStorage.getItem("login") || null;
  login = JSON.parse(login);
  const [user, setUser] = useState({
    address: "",
    avatar: "",
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
    username: "",
    userId: "",
  });
  
  useEffect(() => {
    if (login) {
      const getUser = async () => {
        try {
          const { data } = await axios.get(
            `http://localhost:8000/user/${login.accountId}/getInfor`,
            { headers: { "access-token": "Bearer " + login.accesstoken } }
          );
          if (data.avatar == null) {
            setUser({
              address: data.address,
              avatar: login.avatar,
              email: data.email,
              firstname: data.firstName,
              lastname: data.lastName,
              phone: data.phone,
              username: login.username,
              accountId: login.accountId,
              accesstoken: login.accesstoken,
              userId: data.id,
            });
          }
          setUser({
            address: data.address,
            avatar: data.avatar,
            email: data.email,
            firstname: data.firstName,
            lastname: data.lastName,
            phone: data.phone,
            username: login.username,
            accountId: login.accountId,
            accesstoken: login.accesstoken,
            userId: data.id,
          });
          setIsLogged(true);
        } catch (error) {
          alert(error.response.message);
        }
      };

      getUser();
    }
  }, []);

  return {
    isLogged: [isLogged, setIsLogged],
    user: [user, setUser],
  };
}

export default UserAPI;
