"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAuth from "@/hooks/useAuth";
import { baseServer } from "@/constant";

interface Inputs {
  email: string;
  password: string;
}

function Login() {
  const { user, setUser } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Inputs>();

  useEffect(() => {
    if (user !== null) {
      router.push("/", { scroll: false });
    }
  }, []);

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(`${baseServer}/api/login`, data);
      setUser(data);
      router.push("/", { scroll: false });
      toast.success("Login success");
      localStorage.setItem("AccessToken", response.data?.accessToken);
      localStorage.setItem("RefreshToken", response.data?.refreshToken);
      return response.data;
    } catch (error: any) {
      if (error?.response.status === 401) {
        setError("email", { message: "Email already exist" });
      }
      if (error?.response.status === 402) {
        setError("password", { message: "Password incorrect" });
      }
    }
  };
  return (
    <>
      <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col bg-white shadow-[0_2px_4px_rgba(0,0,0,.1)] py-[10px] px-[15px] rounded-[10px]"
        >
          <h1 className="text-[27px] text-[#0866ff] font-semibold text-center">
            Login
          </h1>
          <input
            type="text"
            className="my-2 py-[14px] px-[16px] border border-[#dddfe2] text-[#050505] w-[330px] h-[40px] rounded-[5px] focus:outline-none"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Not email type",
              },
            })}
          />
          <p className="text-red-400">{errors.email?.message}</p>
          <input
            type="password"
            className="my-2 py-[14px] px-[16px] border border-[#dddfe2] text-[#050505] w-[330px] h-[40px] rounded-[5px] focus:outline-none"
            placeholder="Password"
            {...register("password", {
              required: "password is required",
              minLength: {
                value: 6,
                message: "password is more than 6 letters",
              },
            })}
          />
          <p className="text-red-400"> {errors.password?.message}</p>
          <button
            type="submit"
            className="my-2 px-[16px] text-white font-bold bg-[#0866ff] w-[330px] h-[40px] rounded-[5px] focus:outline-none"
          >
            Login
          </button>
          <Link
            href={`/register`}
            className="flex items-center justify-center my-2 text-white font-bold bg-[#42b72a] w-[330px] h-[40px] rounded-[5px] focus:outline-none"
          >
            Create New Account
          </Link>
        </form>
      </div>
    </>
  );
}

export default Login;
