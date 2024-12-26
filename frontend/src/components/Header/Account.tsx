import { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoLanguage } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import Language from "./Language";
import { LanguageProvider } from "@/context/LanguageContext";
import { User } from "@/interface";

interface Props {
  toggle: boolean;
  user: User;
  setUser: (value: any) => void;
}

function Account({ toggle, user, setUser }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const { t, language } = useContext(LanguageProvider);

  const LogOut = () => {
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("RefreshToken");
    setUser(null);
    router.push("/login", { scroll: false });
  };

  return (
    <div
      className={`${
        toggle ? "block" : "hidden"
      } absolute top-[100%] right-5 bg-white rounded-[8px] w-[300px] p-2 shadow-[0_12px_28px_0_rgba(0,0,0,0.2)]`}
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
      {open ? (
        <Language open={open} setOpen={() => setOpen(false)} />
      ) : (
        <>
          <div
            onClick={() => setOpen(true)}
            className="flex items-center px-2 py-4 my-2 hover:bg-[rgba(0,0,0,0.05)] rounded-[8px] cursor-pointer"
          >
            <IoLanguage
              style={{
                fontSize: 30,
                color: "black",
                background: "rgb(228, 230, 235)",
                padding: 4,
                borderRadius: "100%",
              }}
            />
            <p className="text-[17px] font-medium ml-2">
              {t("Language")!} <span className="uppercase">({language})</span>
            </p>
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
              {t("Logout")!}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default Account;
