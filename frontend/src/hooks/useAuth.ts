import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { User } from "@/interface";

function useAuth() {
  const [user, setUser] = useState({} as User);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

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

  return { user, setUser };
}

export default useAuth;
