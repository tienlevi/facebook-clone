import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  return (
    <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
      <ToastContainer />
      <form
        action=""
        className="flex flex-col bg-white shadow-[0_2px_4px_rgba(0,0,0,.1)] py-[10px] px-[15px] rounded-[10px]"
      >
        <h1 className="text-[27px] text-[#0866ff] font-semibold text-center">
          Login
        </h1>
        <input
          type="text"
          className="my-2 py-[14px] px-[16px] border border-[#dddfe2] text-[#050505] w-[330px] h-[40px] rounded-[5px] focus:outline-none"
          placeholder="Email"
        />
        <input
          type="password"
          className="my-2 py-[14px] px-[16px] border border-[#dddfe2] text-[#050505] w-[330px] h-[40px] rounded-[5px] focus:outline-none"
          placeholder="Password"
        />
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
  );
}

export default Login;
