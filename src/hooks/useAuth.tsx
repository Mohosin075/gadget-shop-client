import { useContext } from "react";
import { AuthContext, AuthContextType } from "../authProvider/AuthProvider";

const useAuth = (): AuthContextType => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("something went wrong");
  }
  return auth;
};

export default useAuth;
