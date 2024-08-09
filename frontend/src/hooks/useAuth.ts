import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { User } from "@/interface";
import useToken from "./useToken";
import { baseServer } from "@/constant";

function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const axiosJWT = axios.create();
  const refreshToken = useToken();

  useEffect(() => {
    const accessToken = localStorage?.getItem("AccessToken");
    (async () => {
      try {
        const { data } = await axiosJWT.get(`${baseServer}/api/auth`, {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        });
        setUser(data.user);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem("AccessToken");
    const requestJWT = axiosJWT.interceptors.request.use(
      async (config) => {
        const decodedToken: any = jwtDecode(accessToken!);
        const currentDate = new Date();
        const newAccessToken = await refreshToken();
        if ((decodedToken.exp as number) * 1000 < currentDate.getTime()) {
          config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseJWT = axiosJWT.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refreshToken();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosJWT.interceptors.request.eject(requestJWT);
      axiosJWT.interceptors.response.eject(responseJWT);
    };
  }, []);

  return { user, setUser };
}

export default useAuth;
