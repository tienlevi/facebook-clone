import { useLayoutEffect, useState, useContext } from "react";
import Link from "next/link";
import { FaFacebook, FaMoon } from "react-icons/fa";
import { IoSearchSharp, IoMenu } from "react-icons/io5";
import { SidebarMobile } from "../Sidebar/Sidebar";
import useAuth from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { searchUsers } from "@/services/user";
import useDebounce from "@/hooks/useDebounce";
import { User } from "@/interface";
import { LanguageProvider } from "@/context/LanguageContext";
import Dropdown from "./Dropdown";
import Account from "./Account";

function Header() {
  const { user } = useAuth();
  const [searchValue, setSearchValue] = useState<string>("");
  const [toggleProfile, setToggleProfile] = useState<boolean>(false);
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const { t } = useContext(LanguageProvider);
  const debounceValue = useDebounce(searchValue, 300);
  const { data: userLists, isLoading } = useQuery<User[]>({
    queryKey: ["users", debounceValue],
    queryFn: async () => {
      return await searchUsers(debounceValue);
    },
  });

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
    <>
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
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={t("SearchUser")!}
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
        <Account toggle={toggleProfile} />
        {debounceValue.length > 0 && (
          <Dropdown loading={isLoading} lists={userLists!} />
        )}
      </div>
      <SidebarMobile active={toggleMenu} />
    </>
  );
}

export default Header;
