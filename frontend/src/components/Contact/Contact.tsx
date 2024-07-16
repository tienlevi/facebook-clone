import Image from "next/image";
import { useImperativeHandle } from "react";

function Contact() {
  return (
    <div className="sticky top-[60px] w-1/4 ml-5 h-screen">
      <h1 className="text-[19px] font-bold">Contact</h1>
      <div className="flex flex-col">
        <div className="flex items-center my-3">
          {/* <Image
            src="https://res.cloudinary.com/dbjkk9wg0/image/upload/v1720775882/facebook-posts/xo41kgbhyxjfbdmfq4n6.png"
            alt=""
            width={35}
            height={35}
            className="rounded-full"
          />
          <div className="ml-2">
            <p className="text-[15px] font-semibold">Nguyễn Trạch Tiến</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Contact;
