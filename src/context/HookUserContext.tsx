import { useContext } from "react";
import { UserContext } from "./UserContext";


const useUserContext = () => {
    const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext debe usarse dentro de un UserProvider");
  }
  return context;
}

export default useUserContext;