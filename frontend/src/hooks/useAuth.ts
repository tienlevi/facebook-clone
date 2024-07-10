import { useState, useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { User } from "@/interface";
import useToken from "./useToken";

function useAuth() {
  const [user, setUser] = useState({} as User);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const axiosJWT = axios.create();
  const refreshToken = useToken();

  useEffect(() => {
    const accessToken = localStorage?.getItem("AccessToken");
    const getData = async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/api/auth", {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        });
        setUser(data.user);
      } catch (error) {
        router.push("/login", { scroll: false });
        console.log(error);
      }
    };
    getData();
  }, []);

  useLayoutEffect(() => {
    const accessToken = localStorage.getItem("AccessToken");
    const requestJWT = axiosJWT.interceptors.request.use(
      async (config) => {
        // const decodedToken: any = jwtDecode(accessToken as string);
        // const currentDate = new Date();
        // const newAccessToken = await refreshToken();
        // if ((decodedToken.exp as number) * 1000 < currentDate.getTime()) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
        // }
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
  }, [user]);

  return { user, setUser, loading };
}

export default useAuth;
