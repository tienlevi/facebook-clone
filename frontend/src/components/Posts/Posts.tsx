import { useState } from "react";
import { Post } from "@/interface";
import { IoEllipsisHorizontal } from "react-icons/io5";
import useAuth from "@/hooks/useAuth";

interface Props {
  posts: Post[];
  editPost?: (data: any) => void;
  deletePost: (id: string) => void;
}

function Posts({ posts, editPost, deletePost }: Props) {
  const { user } = useAuth();
  const [togglePost, setTogglePost] = useState<string | null>(null || "");

  const handleTogglePost = (id: string) => {
    setTogglePost(togglePost === id ? null : id);
  };

  return (
    <div className="relative block mt-2">
      {posts?.map((item, index: number) => (
        <div
          key={index}
          className="relative block bg-white rounded-[8px] p-4 shadow-[0_1px_2px_0_rgba(0,0,0,0.2)] my-4"
        >
          {togglePost === item._id && (
            <div className="absolute top-16 p-2 right-5 w-1/2 bg-white rounded-[10px] shadow-[0_12px_24px_0_rgba(0,0,0,0.2)] cursor-pointer z-20">
              <p className="px-5 py-2 rounded-[10px] hover:bg-[rgb(234,235,236)]">
                Edit Post
              </p>
              <p
                className="px-5 py-2 rounded-[10px] hover:bg-[rgb(234,235,236)]"
                onClick={() => deletePost(item._id!)}
              >
                Delete Post
              </p>
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex">
              <div className="block">
                <img
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
            {user._id === item.userId && (
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
              <img src={item.fileSrc} alt="" className="w-full object-cover" />
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
        </div>
      ))}
    </div>
  );
}

export default Posts;
