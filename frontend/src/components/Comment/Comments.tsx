import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Comment as CommentInterface, User } from "@/interface";
import {
  deleteComment,
  editComment,
  getCommentByPostId,
} from "@/services/comment";
import { toast } from "react-toastify";
import { formatDate } from "@/utils/format";
import TextArea from "../ui/TextArea";
import { IoMdSend } from "react-icons/io";
import { LanguageProvider } from "@/context/LanguageContext";
import { defaultAvatar } from "@/constant";

interface Props {
  postId: string;
  user: User;
}

function Comments({ postId, user }: Props) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [selectComment, setSelectComment] = useState<null>(null);
  const { t } = useContext(LanguageProvider);
  const { data } = useQuery<CommentInterface[]>({
    queryKey: ["comments", postId],
    queryFn: async () => {
      return await getCommentByPostId(postId);
    },
  });

  const { mutate: handleDelete } = useMutation({
    mutationKey: ["comments"],
    mutationFn: async (id: string) => {
      if (confirm("Are you sure want to delete comment ?")) {
        toast.success("Delete success");
        return await deleteComment(id);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

  const { mutate: handleEdit, isPending } = useMutation({
    mutationKey: ["comments"],
    mutationFn: async (data: any) => {
      return await editComment(data._id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      toast.success("Edit success");
      setSelectComment(null);
    },
  });

  const onSubmit = (data: any) => {
    handleEdit(data);
  };

  return (
    <>
      <div
        className={`${
          data?.length! >= 4 && "h-[300px]"
        } bg-white overflow-x-hidden overflow-y-auto`}
      >
        {data?.map((comment) =>
          selectComment === comment._id ? (
            <div className="flex items-start">
              <Image
                src={user?.avatar! ? user.avatar : defaultAvatar}
                alt=""
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="w-[90%] relative flex flex-col">
                <div className="ml-2 bg-[rgb(240,242,245)] rounded-[20px] w-full">
                  <TextArea
                    {...register("content", { required: true })}
                    className="w-full pl-2"
                  />
                  <p className="text-red-500">
                    {errors?.content && (errors.content.message as string)}
                  </p>
                  <button
                    type="submit"
                    className="text-black cursor-pointer p-[10px] float-right"
                  >
                    <IoMdSend />
                  </button>
                </div>
                <div className="flex">
                  {isPending ? (
                    <p className="bg-blue-500 w-[100px] text-white py-2 flex items-center justify-center mt-4 rounded-[10px] cursor-pointer">
                      Loading...
                    </p>
                  ) : (
                    <>
                      <p
                        onClick={() => setSelectComment(null)}
                        className="bg-red-500 w-[100px] text-white ml-2 py-2 flex items-center justify-center mt-4 rounded-[10px] cursor-pointer"
                      >
                        Cancel
                      </p>
                      <button
                        onClick={handleSubmit(onSubmit)}
                        className="bg-blue-500 w-[100px] text-white ml-2 py-2 flex items-center justify-center mt-4 rounded-[10px] cursor-pointer"
                      >
                        Confirm
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            comment.postId === postId && (
              <div key={comment._id} className="flex my-3">
                <div className="">
                  <Image
                    src={user?.avatar! ? user.avatar : defaultAvatar}
                    alt=""
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col ml-2 w-[90%]">
                  <div className="flex flex-col py-1 px-3 bg-[#f0f2f5] rounded-lg">
                    <p className="text-[18px] font-bold leading-8">
                      {comment.name}
                    </p>
                    <p className="text-[15px]">{comment.content}</p>
                  </div>
                  <div className="flex mt-2 gap-3">
                    <div className="text-[#65686c] text-[16px]">
                      {formatDate(comment.createdAt)}
                    </div>
                    {user?._id === comment.userId && (
                      <>
                        <div
                          onClick={() => {
                            reset({
                              _id: comment._id,
                              content: comment.content,
                            });
                            setSelectComment(comment._id as any);
                          }}
                          className="text-[#65686c] text-[16px] cursor-pointer hover:underline"
                        >
                          {t("Edit")!}
                        </div>
                        <div
                          onClick={() => handleDelete(comment._id!)}
                          className="text-[#65686c] text-[16px] cursor-pointer hover:underline"
                        >
                          {t("Delete")!}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          ),
        )}
      </div>
    </>
  );
}

export default Comments;
