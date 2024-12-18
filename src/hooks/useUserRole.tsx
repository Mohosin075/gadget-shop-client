import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";

function useUserRole() {
  const { user } = useAuth();

  const [role, setRole] = useState("");

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`http://localhost:3000/user/${user?.email}`);
      setRole(res.data.role);
    };
    if (user) {
      getData();
    }
  }, [user]);

  return role;
}

export default useUserRole;