"use client";
import Header from "@/components/Header/Header";
import FormAdd from "@/components/Posts/FormAdd";
import PostByUserId from "@/components/Posts/PostByUserId";
import useAuth from "@/hooks/useAuth";
import { User } from "@/interface";
import { getUserById } from "@/services/user";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

function Profile({ params }: { params: { id: string } }) {
  const { user } = useAuth();
  const information = user?._id === params.id ? user._id : params.id;
  const { data } = useQuery<User>({
    queryKey: ["user", information],
    queryFn: async () => {
      return await getUserById(information as string);
    },
  });

  return (
    <>
      <Header />
      <div className="relative max-w-screen-2xl mx-auto mt-[70px] px-2 max-xl:max-w-screen-xl max-lg:max-w-screen-lg max-md:max-w-screen-md">
        <div className="w-full m-2 bg-white rounded-[8px] p-4 shadow-[0_1px_2px_0_rgba(0,0,0,0.2)]">
          <div className="flex items-stretch">
            <Image
              width={150}
              height={150}
              src={data?.avatar!}
              alt=""
              className="rounded-full w-[150px] h-[150px] object-cover"
            />
            <div className="ml-4 flex flex-col">
              <div className="text-[32px] font-bold">{data?.name}</div>
              <div className="text-[22px]">Create at {data?.createdAt}</div>
            </div>
          </div>
        </div>
        <div className="w-full mx-2">
          {user?._id === params.id && <FormAdd />}
          <PostByUserId userId={params.id} />
        </div>
      </div>
    </>
  );
}

export default Profile;
