import { useState } from "react";
import axios from "axios";

function useToken() {
  const [accessToken, setAccessToken] = useState<string>("");

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("RefreshToken");
    try {
      const response = await axios.post(
        `http://localhost:8080/api/refresh-token`,
        {
          refreshToken,
        }
      );
      const newAccessToken = response.data?.accessToken;
      localStorage.setItem("AccessToken", newAccessToken);
      setAccessToken(newAccessToken);
    } catch (err) {
      console.log(err);
    }
  };

  return refreshToken;
}

export default useToken;
