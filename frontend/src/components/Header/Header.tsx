import { useState } from "react";
import { FaFacebook, FaMoon } from "react-icons/fa";
import { IoSearchSharp, IoMenu } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { SidebarMobile } from "../Sidebar/Sidebar";

function Header() {
  const [value, setValue] = useState<string>("");
  const [toggleProfile, setToggleProfile] = useState<boolean>(false);
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  return (
    <>
      <div className="fixed top-0 w-full flex justify-between bg-white h-[56px] px-3 z-50">
        <div className="flex items-center">
          <FaFacebook style={{ color: "#3578E5", fontSize: 40 }} />
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
              src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-1/339750921_3361707387400982_1307641247829571121_n.jpg?stp=c0.6.40.40a_cp0_dst-jpg_p40x40&_nc_cat=104&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGNOMcjsDuES8GouTKzJ5WJoK9xBZgVWRigr3EFmBVZGKULh5tPz0R_QGytvkJOIhLEACF62RwbN5nszpxn7iFk&_nc_ohc=me6tnVt2aTsQ7kNvgEiMz6Q&_nc_ht=scontent.fhan15-2.fna&oh=00_AYBIFALzC1TEuw9K9iUSyyT5Hf2u-9Vqg3wWi70yAuz9AA&oe=668A7F3F"
              alt="image"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        </div>
        <div
          className={`${
            toggleProfile ? "block" : "hidden"
          } absolute bottom-[-230px] right-5 bg-white rounded-[8px] w-[300px] p-2 shadow-[0_12px_28px_0_rgba(0,0,0,0.2)]`}
        >
          <div className="flex items-center p-2 bg-white cursor-pointer shadow-[0_2px_12px_0_rgba(0,0,0,0.2)] rounded-[8px] hover:bg-[rgba(0,0,0,0.05)]">
            <img
              src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-1/339750921_3361707387400982_1307641247829571121_n.jpg?stp=c0.6.40.40a_cp0_dst-jpg_p40x40&_nc_cat=104&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGNOMcjsDuES8GouTKzJ5WJoK9xBZgVWRigr3EFmBVZGKULh5tPz0R_QGytvkJOIhLEACF62RwbN5nszpxn7iFk&_nc_ohc=me6tnVt2aTsQ7kNvgEiMz6Q&_nc_ht=scontent.fhan15-2.fna&oh=00_AYBIFALzC1TEuw9K9iUSyyT5Hf2u-9Vqg3wWi70yAuz9AA&oe=668A7F3F"
              alt="image"
              width={40}
              height={40}
              className="rounded-full"
            />
            <p className="text-[17px] font-medium ml-2">Tiến Nguyễn</p>
          </div>
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
            <p className="text-[17px] font-medium ml-2">Log Out</p>
          </div>
        </div>
      </div>
      <SidebarMobile active={toggleMenu} />
    </>
  );
}

export default Header;
