import { useState } from "react";
import { Post } from "@/interface";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import { useForm } from "react-hook-form";
import usePreview from "@/hooks/usePreview";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";

interface Props {
  posts: Post[];
  editPost: (data: any) => void;
  deletePost: (id: string, publicId: string) => void;
  isLoading: boolean;
  fileRef: any;
}

function Posts({ posts, editPost, deletePost, isLoading, fileRef }: Props) {
  const { user } = useAuth();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [togglePost, setTogglePost] = useState<string | null>(null);
  const [selectPost, setSelectPost] = useState<null>(null);
  const { file, fileType, handleChangeFile } = usePreview();
  const sortPosts = posts.sort((a, b) => {
    if (user?._id === a.userId) {
      return -1;
    }
    if (user?._id === b.userId) {
      return 1;
    }
    return 0;
  });

  const handleTogglePost = (id: string) => {
    setTogglePost(togglePost === id ? null : id);
  };

  const onSubmit = async (data: any) => {
    editPost({ ...data, fileType: fileType });
  };

  return (
    <div className="relative block mt-2">
      {sortPosts?.map((item, index: number) =>
        selectPost === item._id ? (
          <form
            key={index}
            onSubmit={handleSubmit(onSubmit)}
            className="block bg-white rounded-[8px] p-4 shadow-[0_1px_2px_0_rgba(0,0,0,0.2)]"
          >
            <div className="flex pb-4 border-b border-[rgb(228,230,235)]">
              <textarea
                {...register("title", { required: true })}
                disabled={isSubmitting}
                className="w-full ml-2 pl-2 text-[rgb(28,30,33)] bg-[rgb(240,242,245)] rounded-[20px] resize-none focus:outline-none"
              ></textarea>
              <p className="text-red-500">
                {errors?.title && (errors.title.message as string)}
              </p>
            </div>
            <div className="my-5">
              {fileType === "image" && <img src={file as any} alt="" />}
              {fileType === "video" && (
                <video controls className="w-full">
                  <source
                    src={file}
                    type="video/mp4"
                    className="object-cover"
                  />
                </video>
              )}
              {fileType === "" && item.fileType === "image" && (
                <img
                  src={item.fileSrc}
                  alt=""
                  className="w-full object-cover"
                />
              )}
              {fileType === "" && item.fileType === "video" && (
                <video controls className="w-full">
                  <source
                    src={item.fileSrc}
                    type="video/mp4"
                    className="object-cover"
                  />
                </video>
              )}
              <input type="file" ref={fileRef} onChange={handleChangeFile} />
            </div>
            <div className="flex justify-between">
              {isLoading ? (
                <p className="bg-blue-500 w-[100px] text-white py-2 flex items-center justify-center mt-4 rounded-[10px] cursor-pointer">
                  Loading...
                </p>
              ) : (
                <>
                  <p
                    onClick={() => setSelectPost(null)}
                    className="bg-red-500 w-[100px] text-white py-2 flex items-center justify-center mt-4 rounded-[10px] cursor-pointer"
                  >
                    Cancel
                  </p>
                  <button
                    type="submit"
                    className="bg-blue-500 w-[100px] text-white py-2 flex items-center justify-center mt-4 rounded-[10px] cursor-pointer"
                  >
                    Confirm
                  </button>
                </>
              )}
            </div>
          </form>
        ) : (
          <div
            key={index}
            className="relative block bg-white rounded-[8px] p-4 shadow-[0_1px_2px_0_rgba(0,0,0,0.2)] my-4"
          >
            {togglePost === item._id && (
              <div className="absolute top-16 p-2 right-5 w-1/2 bg-white rounded-[10px] shadow-[0_12px_24px_0_rgba(0,0,0,0.2)] cursor-pointer z-20">
                <p
                  className="px-5 py-2 rounded-[10px] hover:bg-[rgb(234,235,236)]"
                  onClick={() => {
                    reset({ _id: item._id, title: item.title });
                    setSelectPost(item._id as any);
                  }}
                >
                  Edit Post
                </p>
                <p
                  className="px-5 py-2 rounded-[10px] hover:bg-[rgb(234,235,236)]"
                  onClick={() => deletePost(item._id!, item.publicId)}
                >
                  Delete Post
                </p>
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex">
                <div className="block">
                  <Image
                    src={item.userInfo?.avatar}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full w-[40px] h-[40px] object-cover"
                  />
                </div>
                <div className="flex flex-col ml-2">
                  <p className="text-[15px] font-semibold">
                    {item.userInfo?.name}
                  </p>
                  <p className="text-[14px] text-[rgb(101,103,107)]">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              {user?._id === item.userId && (
                <div
                  className="block p-2 rounded-full cursor-pointer hover:bg-[#F0F2F5]"
                  onClick={() => handleTogglePost(item._id!)}
                >
                  <IoEllipsisHorizontal
                    style={{ fontSize: 25, color: "#1c1e21" }}
                  />
                </div>
              )}
            </div>
            <div className="text-[17px] my-2">{item.title}</div>
            <div className="w-full">
              {item.fileType === "image" && (
                <img
                  src={item.fileSrc}
                  alt=""
                  className="w-full object-cover"
                />
              )}
              {item.fileType === "video" && (
                <video controls className="w-full">
                  <source
                    src={item.fileSrc}
                    type="video/mp4"
                    className="object-cover"
                  />
                </video>
              )}
            </div>
            <div className="border-t border-[#c9c2c2] my-2">
              <div className="flex items-center justify-center my-3">
                <div className="flex items-center py-2 px-4 mx-5 rounded-[10px] hover:bg-[#E4E6EB] cursor-pointer">
                  <AiOutlineLike style={{ fontSize: 25 }} />
                  <p className="ml-2">Like</p>
                </div>
                <div className="flex items-center py-2 px-4 mx-5 rounded-[10px] hover:bg-[#E4E6EB] cursor-pointer">
                  <FaRegComment style={{ fontSize: 25 }} />
                  <p className="ml-2">Comment</p>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default Posts;
