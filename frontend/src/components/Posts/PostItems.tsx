import { useState } from "react";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Post } from "@/interface";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { AiFillLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { deletePost, likePost, unlikePost } from "@/services/post";
import { deleteImageCloundinary } from "@/utils/cloudinary";
import LikePost from "./LikePost";
import File from "./File";
import FormEdit from "./FormEdit";
import Comments from "../Comment/Comments";
import SendComment from "../Comment/SendComment";
import { formatDate } from "@/utils/format";

interface Props {
  posts: Post[];
}

function PostItems({ posts }: Props) {
  const { user } = useAuth();
  const methods = useForm();
  const queryClient = useQueryClient();
  const [togglePost, setTogglePost] = useState<string | null>(null);
  const [selectPost, setSelectPost] = useState<null>(null);

  const handleTogglePost = (id: string) => {
    setTogglePost(togglePost === id ? null : id);
  };

  const { mutate: handleDelete } = useMutation({
    mutationKey: ["posts"],
    mutationFn: async (data: any) => {
      if (confirm("Are you sure want to delete ?")) {
        (await deletePost(data.id)) &&
          (await deleteImageCloundinary(data.publicId));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Delete success");
    },
  });

  const { mutate: handleLikePost } = useMutation({
    mutationKey: ["posts"],
    mutationFn: async (data: any) => {
      data.like.count += 1;
      data.like.users.push({
        userIdLike: user?._id,
        name: user?.name,
        avatar: user?.avatar,
      });

      return await likePost(data._id!, user?._id!, data);
    },
  });

  const { mutate: handleUnlikePost } = useMutation({
    mutationKey: ["posts"],
    mutationFn: async (data: Post) => {
      data.like.count -= 1;
      data.like.users.filter((item) => item.userIdLike !== user?._id);
      return await unlikePost(data._id!, user?._id!, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return (
    <FormProvider {...methods}>
      {posts.map((item, index: number) =>
        selectPost === item._id ? (
          <FormEdit
            key={item._id}
            onSelectPost={async () => setSelectPost(null)}
            fileSrc={item.fileSrc}
            filePostType={item.fileType}
          />
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
                    methods.reset({ _id: item._id, title: item.title });
                    setSelectPost(item._id as any);
                  }}
                >
                  Edit Post
                </p>
                <p
                  className="px-5 py-2 rounded-[10px] hover:bg-[rgb(234,235,236)]"
                  onClick={() =>
                    handleDelete({ id: item._id!, publicId: item.publicId })
                  }
                >
                  Delete Post
                </p>
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex">
                <Link href={`/profile/${item.userId}`} className="block">
                  <Image
                    src={item.userInfo?.avatar}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full w-[40px] h-[40px] object-cover"
                  />
                </Link>
                <div className="flex flex-col ml-2">
                  <p className="text-[15px] font-semibold">
                    {item.userInfo?.name}
                  </p>
                  <p className="text-[14px] text-[rgb(101,103,107)]">
                    {formatDate(item.createdAt)}
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
            <File fileType={item.fileType} fileSrc={item.fileSrc} />
            <div className="flex items-center">
              <AiFillLike style={{ fontSize: 20 }} />
              <p className="ml-2">{item.like.count} Likes</p>
            </div>
            <div className="border-t border-b border-[#c9c2c2] my-2">
              <div className="flex items-center justify-center my-3">
                <LikePost
                  postId={item}
                  users={item.like.users}
                  likePost={handleLikePost}
                  unlikePost={handleUnlikePost}
                />
                <div className="w-1/2 flex items-center justify-center py-2 rounded-[10px] hover:bg-[#E4E6EB] cursor-pointer">
                  <FaRegComment style={{ fontSize: 25 }} />
                  <p className="ml-2">Comment</p>
                </div>
              </div>
            </div>
            <Comments postId={item._id!} />
            <SendComment key={item._id} postId={item._id} />
          </div>
        )
      )}
    </FormProvider>
  );
}

export default PostItems;
