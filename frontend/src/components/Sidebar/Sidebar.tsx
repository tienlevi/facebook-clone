import { FaUserFriends } from "react-icons/fa";
import { PiTelevisionSimpleBold } from "react-icons/pi";

interface Props {
  active: boolean;
}

export function Sidebar() {
  return (
    <div className="max-md:hidden sticky top-[60px] flex flex-col w-1/4 h-screen">
      <div className="border-b border-gray-300">
        <div className="my-3 flex items-center">
          <img
            src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-1/339750921_3361707387400982_1307641247829571121_n.jpg?stp=c0.6.40.40a_cp0_dst-jpg_p40x40&_nc_cat=104&ccb=1-7&_nc_sid=6738e8&_nc_eui2=AeGNOMcjsDuES8GouTKzJ5WJoK9xBZgVWRigr3EFmBVZGKULh5tPz0R_QGytvkJOIhLEACF62RwbN5nszpxn7iFk&_nc_ohc=me6tnVt2aTsQ7kNvgEiMz6Q&_nc_ht=scontent.fhan15-2.fna&oh=00_AYBIFALzC1TEuw9K9iUSyyT5Hf2u-9Vqg3wWi70yAuz9AA&oe=668A7F3F"
            alt=""
            width={35}
            height={35}
            className="rounded-full"
          />
          <p className="text-[19px] font-medium ml-3">Tiến Nguyễn</p>
        </div>
        <div className="my-3 flex items-center">
          <FaUserFriends style={{ fontSize: 35 }} />
          <p className="text-[16px] font-medium ml-3">Friends</p>
        </div>
        <div className="my-3 flex items-center">
          <PiTelevisionSimpleBold style={{ fontSize: 35 }} />
          <p className="text-[16px] font-medium ml-3">Watch</p>
        </div>
      </div>
      <div className="block mt-3">
        <h1 className="text-[17px] text-[rgb(101,103,107)] font-semibold">
          Your shortcuts
        </h1>
        <div className="my-3 flex items-center">
          <img
            src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/313209665_526415922829139_1931573599479211662_n.png?stp=c19.0.50.50a_cp0_dst-png_p50x50&_nc_cat=107&ccb=1-7&_nc_sid=1760b9&_nc_eui2=AeGgvKJz34-VwaXEuGad2_wJ29zV8bP_89Xb3NXxs__z1VwFhWErfROkUbF2AOlWC9BkUMVgs_OoYoKZsj8XLETu&_nc_ohc=B-n3Iz8AbjAQ7kNvgG-w4Jj&_nc_ht=scontent.fhan15-2.fna&oh=00_AYBpw2lpk5uBuLoU7QxewyppEDMIQiHQ0DmpIR9kqFoKnQ&oe=668AE068"
            alt=""
            width={35}
            height={35}
            className="rounded-[6px]"
          />
          <p className="text-[16px] font-medium ml-3">
            Học lập trình web (F8 - Fullstack.edu.vn)
          </p>
        </div>
        <div className="my-3 flex items-center">
          <img
            src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/416707370_327768683514755_2518506004796637814_n.png?stp=c23.0.50.50a_cp0_dst-png_p50x50&_nc_cat=107&ccb=1-7&_nc_sid=1760b9&_nc_eui2=AeGnb4UsnVtNNveNnlCzyCDVcli2hM7g9RJyWLaEzuD1Et1OUKN9EQHEyRThX0frTlLIrj5aMWPuiMbYqOEbLgL3&_nc_ohc=0Jq0uO54XvoQ7kNvgH43bnP&_nc_ht=scontent.fhan15-2.fna&oh=00_AYDoZXhnu0aFLDHP3Vgh4dmfOOT8mc2ThdDjUw7l9Vb2Pw&oe=668AFA3D"
            alt=""
            width={35}
            height={35}
            className="rounded-[6px]"
          />
          <p className="text-[16px] font-medium ml-3">
            Nhóm Học Tập FPT Polytechnic
          </p>
        </div>
        <div className="my-3 flex items-center">
          <img
            src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/428613555_359796206978669_782178499167844018_n.png?stp=c19.0.50.50a_cp0_dst-png_p50x50&_nc_cat=100&ccb=1-7&_nc_sid=1760b9&_nc_eui2=AeHYTpEXQpujqcI5nQZPUXCW_dbh_iMuMs391uH-Iy4yzfw0dnKAqbRQLFKQAU3_3DFlIqbfVpEil-NxI8V1YDnp&_nc_ohc=ZrqStjtBs8kQ7kNvgHWIrUQ&_nc_ht=scontent.fhan15-2.fna&oh=00_AYDD-Ioe8dHGMJUbKqNeq4FduxZaEZp4Hnvv-UWysT0wIA&oe=668ADE95"
            alt=""
            width={35}
            height={35}
            className="rounded-[6px]"
          />
          <p className="text-[16px] font-medium ml-3">Sinh Viên Poly</p>
        </div>
      </div>
    </div>
  );
}

export function SidebarMobile({ active }: Props) {
  return (
    <div
      className={`${
        active ? "block" : "hidden"
      } fixed left-0 top-[55px] right-0 flex flex-col w-full h-full px-3 z-50 bg-[#F0F2F5]`}
    >
      <div className="border-b border-gray-300">
        <div className="my-3 flex items-center">
          <img
            src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-1/339750921_3361707387400982_1307641247829571121_n.jpg?stp=c0.6.40.40a_cp0_dst-jpg_p40x40&_nc_cat=104&ccb=1-7&_nc_sid=6738e8&_nc_eui2=AeGNOMcjsDuES8GouTKzJ5WJoK9xBZgVWRigr3EFmBVZGKULh5tPz0R_QGytvkJOIhLEACF62RwbN5nszpxn7iFk&_nc_ohc=me6tnVt2aTsQ7kNvgEiMz6Q&_nc_ht=scontent.fhan15-2.fna&oh=00_AYBIFALzC1TEuw9K9iUSyyT5Hf2u-9Vqg3wWi70yAuz9AA&oe=668A7F3F"
            alt=""
            width={35}
            height={35}
            className="rounded-full"
          />
          <p className="text-[19px] font-medium ml-3">Tiến Nguyễn</p>
        </div>
        <div className="my-3 flex items-center">
          <FaUserFriends style={{ fontSize: 35 }} />
          <p className="text-[16px] font-medium ml-3">Friends</p>
        </div>
        <div className="my-3 flex items-center">
          <PiTelevisionSimpleBold style={{ fontSize: 35 }} />
          <p className="text-[16px] font-medium ml-3">Watch</p>
        </div>
      </div>
      <div className="block mt-3">
        <h1 className="text-[17px] text-[rgb(101,103,107)] font-semibold">
          Your shortcuts
        </h1>
        <div className="my-3 flex items-center">
          <img
            src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/313209665_526415922829139_1931573599479211662_n.png?stp=c19.0.50.50a_cp0_dst-png_p50x50&_nc_cat=107&ccb=1-7&_nc_sid=1760b9&_nc_eui2=AeGgvKJz34-VwaXEuGad2_wJ29zV8bP_89Xb3NXxs__z1VwFhWErfROkUbF2AOlWC9BkUMVgs_OoYoKZsj8XLETu&_nc_ohc=B-n3Iz8AbjAQ7kNvgG-w4Jj&_nc_ht=scontent.fhan15-2.fna&oh=00_AYBpw2lpk5uBuLoU7QxewyppEDMIQiHQ0DmpIR9kqFoKnQ&oe=668AE068"
            alt=""
            width={35}
            height={35}
            className="rounded-[6px]"
          />
          <p className="text-[16px] font-medium ml-3">
            Học lập trình web (F8 - Fullstack.edu.vn)
          </p>
        </div>
        <div className="my-3 flex items-center">
          <img
            src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/416707370_327768683514755_2518506004796637814_n.png?stp=c23.0.50.50a_cp0_dst-png_p50x50&_nc_cat=107&ccb=1-7&_nc_sid=1760b9&_nc_eui2=AeGnb4UsnVtNNveNnlCzyCDVcli2hM7g9RJyWLaEzuD1Et1OUKN9EQHEyRThX0frTlLIrj5aMWPuiMbYqOEbLgL3&_nc_ohc=0Jq0uO54XvoQ7kNvgH43bnP&_nc_ht=scontent.fhan15-2.fna&oh=00_AYDoZXhnu0aFLDHP3Vgh4dmfOOT8mc2ThdDjUw7l9Vb2Pw&oe=668AFA3D"
            alt=""
            width={35}
            height={35}
            className="rounded-[6px]"
          />
          <p className="text-[16px] font-medium ml-3">
            Nhóm Học Tập FPT Polytechnic
          </p>
        </div>
        <div className="my-3 flex items-center">
          <img
            src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/428613555_359796206978669_782178499167844018_n.png?stp=c19.0.50.50a_cp0_dst-png_p50x50&_nc_cat=100&ccb=1-7&_nc_sid=1760b9&_nc_eui2=AeHYTpEXQpujqcI5nQZPUXCW_dbh_iMuMs391uH-Iy4yzfw0dnKAqbRQLFKQAU3_3DFlIqbfVpEil-NxI8V1YDnp&_nc_ohc=ZrqStjtBs8kQ7kNvgHWIrUQ&_nc_ht=scontent.fhan15-2.fna&oh=00_AYDD-Ioe8dHGMJUbKqNeq4FduxZaEZp4Hnvv-UWysT0wIA&oe=668ADE95"
            alt=""
            width={35}
            height={35}
            className="rounded-[6px]"
          />
          <p className="text-[16px] font-medium ml-3">Sinh Viên Poly</p>
        </div>
      </div>
    </div>
  );
}
