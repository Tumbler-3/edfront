import { jwtDecode } from "jwt-decode";

const userExists = () => {
    try {
      const accessToken = localStorage.getItem("access");
      const time = jwtDecode(accessToken).exp > Date.now() / 1000;
      if (time === false) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  export default userExists;
