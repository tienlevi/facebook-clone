import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";
import { IoMdSend } from "react-icons/io";
import { addComment, getCommentByPostId } from "@/services/comment";
import { toast } from "react-toastify";
import TextArea from "../ui/TextArea";
import { defaultAvatar } from "@/constant";

interface Props {
  postId?: string;
}

function SendComment({ postId }: Props) {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["comments"],
    mutationFn: async (data: any) => {
      return await addComment(data);
    },
    onSuccess: () => {
      toast.success("Send Comment success");
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  const onSubmit = (data: any) => {
    mutate({
      ...data,
      name: user?.name,
      avatar: user?.avatar,
      userId: user?._id,
      postId: postId,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex items-center"
    >
      <Image
        src={user?.avatar! ? user.avatar : defaultAvatar}
        alt=""
        width={40}
        height={40}
        className="w-10 h-10 rounded-full object-cover"
      />
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
    </form>
  );
}

export default SendComment;
