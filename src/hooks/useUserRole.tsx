import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";

function useUserRole() {
  const { user } = useAuth();

  const [userFromDD, setUser] = useState({});

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`http://localhost:3000/user/${user?.email}`);
      setUser(res.data);
    };
    if (user) {
      getData();
    }
  }, [user]);

  return userFromDD;
}

export default useUserRole;
