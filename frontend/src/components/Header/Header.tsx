import { useLayoutEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaFacebook, FaMoon } from "react-icons/fa";
import { IoSearchSharp, IoMenu } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { SidebarMobile } from "../Sidebar/Sidebar";
import useAuth from "@/hooks/useAuth";

function Header() {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const [value, setValue] = useState<string>("");
  const [toggleProfile, setToggleProfile] = useState<boolean>(false);
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

  const LogOut = () => {
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("RefreshToken");
    setUser(null);
    router.push("/login", { scroll: false });
  };

  useLayoutEffect(() => {
    const resize = () => {
      if (window.innerWidth > 768) {
        setToggleMenu(false);
      }
    };

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  });

  return (
    <div>
      <div className="fixed top-0 w-full flex justify-between bg-white h-[56px] px-3 z-50">
        <div className="flex items-center">
          <Link href={`/`}>
            <FaFacebook style={{ color: "#3578E5", fontSize: 40 }} />
          </Link>
          <div className="flex items-center bg-[#F0F2F5] ml-4 rounded-[50px]">
            <IoSearchSharp
              style={{
                paddingLeft: 12,
                fontSize: 30,
                background: "#F0F2F5",
                borderRadius: 50,
                cursor: "pointer",
              }}
            />
            <input
              type="text"
              className="px-3 text-[#050505] bg-[#F0F2F5] h-[40px] rounded-[50px] focus:outline-none"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Search Facebook"
            />
          </div>
        </div>
        <div className="flex items-center">
          <div
            className="max-md:flex hidden items-center justify-center mr-4 w-[40px] h-[40px] rounded-full bg-[rgb(228,230,235)] cursor-pointer"
            onClick={() => setToggleMenu(!toggleMenu)}
          >
            <IoMenu
              style={{
                fontSize: 30,
                color: "black",
              }}
            />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setToggleProfile(!toggleProfile)}
          >
            <img
              src={user?.avatar}
              alt=""
              width={40}
              height={40}
              className="w-[40px] h-[40px] object-cover rounded-full"
            />
          </div>
        </div>
        <div
          className={`${
            toggleProfile ? "block" : "hidden"
          } absolute bottom-[-230px] right-5 bg-white rounded-[8px] w-[300px] p-2 shadow-[0_12px_28px_0_rgba(0,0,0,0.2)]`}
        >
          <Link
            href={`/profile/${user?._id}`}
            className="flex items-center p-2 bg-white cursor-pointer shadow-[0_2px_12px_0_rgba(0,0,0,0.2)] rounded-[8px] hover:bg-[rgba(0,0,0,0.05)]"
          >
            <img
              src={user?.avatar}
              alt=""
              width={40}
              height={40}
              className="w-[40px] h-[40px] object-cover rounded-full"
            />
            <p className="text-[17px] font-medium ml-2">{user?.name}</p>
          </Link>
          <div className="flex items-center px-2 py-4 my-2 hover:bg-[rgba(0,0,0,0.05)] rounded-[8px] cursor-pointer">
            <FaMoon
              style={{
                fontSize: 30,
                color: "black",
                background: "rgb(228, 230, 235)",
                padding: 4,
                borderRadius: "100%",
              }}
            />
            <p className="text-[17px] font-medium ml-2">Theme Mode</p>
          </div>
          <div className="flex items-center px-2 py-4 my-2 hover:bg-[rgba(0,0,0,0.05)] rounded-[8px] cursor-pointer">
            <TbLogout
              style={{
                fontSize: 30,
                color: "black",
                background: "rgb(228, 230, 235)",
                padding: 4,
                borderRadius: "100%",
              }}
            />
            <p className="text-[17px] font-medium ml-2" onClick={LogOut}>
              Log Out
            </p>
          </div>
        </div>
      </div>
      <SidebarMobile active={toggleMenu} />
    </div>
  );
}

export default Header;
