import { Post, User } from "@/interface";
import { getPosts } from "@/services/post";
import { getUsers } from "@/services/user";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

function Comment() {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return await getUsers();
    },
  });
  console.log(data);

  return (
    <div className="h-[300px] bg-white overflow-x-hidden overflow-y-auto">
      {data?.map((item: any) => (
        <div className="flex my-3">
          <div className="">
            <Image
              src={item.avatar}
              alt=""
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col ml-4 py-1 px-3 w-[90%] bg-[#f0f2f5] rounded-lg">
            <p className="text-[18px] font-bold leading-8">{item.name}</p>
            <p className="text-[15px]">
              XIN CÔ ĐƠN ĐI | K-ICM FT. APJ (#AMCDD2) | THÁI QUỲNH COVER | HOT
              TIKTOK
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Comment;
