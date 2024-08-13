"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import Loading from "@/components/Loading/Loading";
import { registerUser } from "@/services/auth";

interface Inputs {
  name: string;
  email: string;
  tel: string;
  password: string;
  confirmPassword: string;
}

function Register() {
  const { status, isLoadingUser } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setError,
  } = useForm<Inputs>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (status === 200) {
      router.push("/");
    }
  }, [status, isLoadingUser]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const onSubmit = async (data: any) => {
    try {
      const respose = await registerUser(data);
      toast.success("Register success");
      return respose.data;
    } catch (error: any) {
      if (error?.response.status === 401) {
        setError("email", { message: "Email already exist" });
      }
    }
  };

  if (isLoading) return <Loading />;
  if (status === 200) return <Loading />;
  return (
    <>
      <div className="absolute mt-[100px] left-1/2 translate-x-[-50%]">
        <form
          className="flex flex-col bg-white shadow-[0_2px_4px_rgba(0,0,0,.1)] py-[10px] px-[15px] rounded-[10px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-[27px] text-[#0866ff] font-semibold text-center">
            Register
          </h1>
          <input
            type="text"
            className="my-2 py-[14px] px-[16px] border border-[#dddfe2] text-[#050505] w-[330px] h-[40px] rounded-[5px] focus:outline-none"
            placeholder="Name"
            {...register("name", {
              required: "Name is required",
            })}
          />
          <p className="text-red-400">{errors.name?.message}</p>
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
            type="text"
            className="my-2 py-[14px] px-[16px] border border-[#dddfe2] text-[#050505] w-[330px] h-[40px] rounded-[5px] focus:outline-none"
            placeholder="Phone number"
            {...register("tel", { required: "Tel is required" })}
          />
          <p className="text-red-400">{errors.tel?.message}</p>
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
          <input
            type="password"
            className="my-2 py-[14px] px-[16px] border border-[#dddfe2] text-[#050505] w-[330px] h-[40px] rounded-[5px] focus:outline-none"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "confirm password is required",
              validate: (value) => {
                if (value !== watch("password")) {
                  return "Not valid password";
                }
              },
            })}
          />
          <p className="text-red-400">{errors.confirmPassword?.message}</p>
          {isSubmitting ? (
            <p className="flex items-center justify-center my-2 px-[16px] text-white font-bold bg-[#0866ff] w-[330px] h-[40px] rounded-[5px]">
              Loading...
            </p>
          ) : (
            <button
              type="submit"
              className="my-2 px-[16px] text-white font-bold bg-[#0866ff] w-[330px] h-[40px] rounded-[5px] focus:outline-none"
            >
              Register
            </button>
          )}
          <Link
            href={`/login`}
            className="flex items-center justify-center my-2 text-white font-bold bg-[#42b72a] w-[330px] h-[40px] rounded-[5px] focus:outline-none"
          >
            Back to Login
          </Link>
        </form>
      </div>
    </>
  );
}

export default Register;
