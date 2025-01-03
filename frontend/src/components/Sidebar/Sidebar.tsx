import useAuth from "@/hooks/useAuth";
import { FaUserFriends } from "react-icons/fa";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import Image from "next/image";
import { useContext } from "react";
import { LanguageProvider } from "@/context/LanguageContext";

interface Props {
  active: boolean;
}

export function Sidebar() {
  const { t } = useContext(LanguageProvider);
  const { user } = useAuth();

  return (
    <div className="max-md:hidden sticky top-[60px] flex flex-col w-1/4 h-screen">
      <div className="border-b border-gray-300">
        <div className="my-3 flex items-center">
          <img
            src={user?.avatar}
            alt=""
            width={40}
            height={40}
            className="w-[40px] h-[40px] object-cover rounded-full"
          />
          <p className="text-[19px] font-medium ml-3">{user?.name}</p>
        </div>
        <div className="my-3 flex items-center">
          <FaUserFriends style={{ fontSize: 35 }} />
          <p className="text-[16px] font-medium ml-3">{t("Friends")!}</p>
        </div>
        <div className="my-3 flex items-center">
          <PiTelevisionSimpleBold style={{ fontSize: 35 }} />
          <p className="text-[16px] font-medium ml-3">{t("Watch")!}</p>
        </div>
      </div>
    </div>
  );
}

export function SidebarMobile({ active }: Props) {
  const { t } = useContext(LanguageProvider);
  const { user } = useAuth();

  return (
    <div
      className={`${
        active ? "flex" : "hidden"
      } fixed left-0 top-[55px] right-0 flex-col w-full h-full px-3 z-50 bg-[#F0F2F5]`}
    >
      <div className="border-b border-gray-300">
        <div className="my-3 flex items-center">
          <Image
            src="https://res.cloudinary.com/dbjkk9wg0/image/upload/v1720775882/facebook-posts/xo41kgbhyxjfbdmfq4n6.png"
            alt=""
            width={35}
            height={35}
            className="rounded-full"
          />
          <p className="text-[19px] font-medium ml-3">{user?.name}</p>
        </div>
        <div className="my-3 flex items-center">
          <FaUserFriends style={{ fontSize: 35 }} />
          <p className="text-[16px] font-medium ml-3">{t("Friends")!}</p>
        </div>
        <div className="my-3 flex items-center">
          <PiTelevisionSimpleBold style={{ fontSize: 35 }} />
          <p className="text-[16px] font-medium ml-3">{t("Watch")!}</p>
        </div>
      </div>
      <div className="block mt-3">
        <div className="my-3 flex items-center">
          <Image
            src="https://res.cloudinary.com/dbjkk9wg0/image/upload/v1720775882/facebook-posts/xo41kgbhyxjfbdmfq4n6.png"
            alt=""
            width={35}
            height={35}
            className="rounded-[6px]"
          />
          <p className="text-[16px] font-medium ml-3">
            Học lập trình web (F8 - Fullstack.edu.vn)
          </p>
        </div>
      </div>
    </div>
  );
}
