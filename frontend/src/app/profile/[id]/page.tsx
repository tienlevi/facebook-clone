"use client";
import { FormEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Header from "@/components/Header/Header";
import FormAdd from "@/components/Posts/FormAdd";
import PostByUserId from "@/components/Posts/PostByUserId";
import useAuth from "@/hooks/useAuth";
import { User } from "@/interface";
import { getUserById } from "@/services/user";
import { RxAvatar } from "react-icons/rx";
import { CiImageOn } from "react-icons/ci";
import UploadAvatar from "@/components/Upload/UploadAvatar";
import { defaultAvatar } from "@/constant";
import PreviewAvatar from "@/components/Upload/PreviewAvatar";
import { formatDate } from "@/utils/format";

function Profile({ params }: { params: { id: string } }) {
  const { user, status, isLoadingUser } = useAuth();
  const router = useRouter();
  const information = user?._id === params.id ? user._id : params.id;
  const [toggleAvatar, setToggleAvatar] = useState<boolean>(false);
  const [previewAvatar, setPreviewAvatar] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const { data } = useQuery<User>({
    queryKey: ["user", information],
    queryFn: async () => {
      return await getUserById(information as string);
    },
  });

  useEffect(() => {
    if (status === 403 || status === 401 || status === 400) {
      router.push("/");
    }
  }, [status, isLoadingUser]);

  useEffect(() => {
    const handler = (e: any) => {
      if (bodyRef.current?.contains(e.target)) {
        setPreviewAvatar(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, [previewAvatar]);

  useLayoutEffect(() => {
    openModal
      ? (document.body.style.overflowY = "hidden")
      : (document.body.style.overflowY = "scroll");
    previewAvatar
      ? (document.body.style.overflowY = "hidden")
      : (document.body.style.overflowY = "scroll");
  }, [openModal, previewAvatar]);

  return (
    <>
      <Header />
      {openModal && <UploadAvatar onOpenModel={() => setOpenModal(false)} />}
      {previewAvatar && <PreviewAvatar image={user?.avatar!} />}

      <div
        ref={bodyRef}
        className={
          openModal || previewAvatar
            ? "absolute top-0 right-0 bottom-0 left-0 h-screen bg-[#f2f4f7] z-20"
            : ""
        }
      />
      <div
        className={`relative max-w-screen-2xl mx-auto mt-[70px] px-2 max-xl:max-w-screen-xl max-lg:max-w-screen-lg max-md:max-w-screen-md`}
      >
        <div className="w-full m-2 bg-white rounded-[8px] p-4 shadow-[0_1px_2px_0_rgba(0,0,0,0.2)] relative">
          <div className="flex items-stretch">
            <Image
              width={150}
              height={150}
              src={data?.avatar! ? data.avatar : defaultAvatar}
              alt={data?.name!}
              className="rounded-full w-[150px] h-[150px] object-cover cursor-pointer"
              onClick={() => setToggleAvatar(!toggleAvatar)}
            />
            <div className="ml-4 flex flex-col">
              <div className="text-[32px] font-bold">{data?.name}</div>
              <div className="text-[22px]">
                Create at {formatDate(data?.createdAt)}
              </div>
            </div>
          </div>
          <div
            className={`${
              toggleAvatar ? "block" : "hidden"
            } absolute bottom-[-70%] p-2 left-5 w-[300px] bg-white rounded-[10px] shadow-[0_12px_24px_0_rgba(0,0,0,0.2)] cursor-pointer z-10`}
          >
            <div
              onClick={() => setPreviewAvatar(true)}
              className="flex items-center px-5 py-2 rounded-[10px] hover:bg-[rgb(234,235,236)]"
            >
              <RxAvatar style={{ fontSize: 30 }} />{" "}
              <p className="ml-2 text-[18px]">Preview Avatar</p>
            </div>
            <div
              onClick={() => setOpenModal(true)}
              className="flex items-center px-5 py-2 rounded-[10px] hover:bg-[rgb(234,235,236)]"
            >
              <CiImageOn style={{ fontSize: 30 }} />{" "}
              <p className="ml-2 text-[18px]">Upload Avatar</p>
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
