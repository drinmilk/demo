import { useEffect } from "react";
import { tokenKey } from "../config";
function Logout() {
  useEffect(() => {
    localStorage.removeItem(tokenKey);
    window.location = "home";
  });
  return null;
}

export default Logout;
