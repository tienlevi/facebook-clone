import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Comment as CommentInterface } from "@/interface";
import { deleteComment, getCommentByPostId } from "@/services/comment";
import { toast } from "react-toastify";
import useAuth from "@/hooks/useAuth";

interface Props {
  postId: string;
}

function Comments({ postId }: Props) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
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
        return await deleteComment(id);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      toast.success("Delete success");
    },
  });

  return (
    <>
      <div
        className={`${
          data?.length! >= 4 && "h-[300px]"
        } bg-white overflow-x-hidden overflow-y-auto`}
      >
        {data?.map(
          (comment) =>
            comment.postId === postId && (
              <div key={comment._id} className="flex my-3">
                <div className="">
                  <Image
                    src={comment.avatar}
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
                  {user?._id === comment.userId && (
                    <div className="flex mt-1 gap-3">
                      <div className="text-[#65686c] text-[16px] cursor-pointer hover:underline">
                        {comment.createdAt}
                      </div>
                      <div className="text-[#65686c] text-[16px] cursor-pointer hover:underline">
                        Edit
                      </div>
                      <div
                        onClick={() => handleDelete(comment._id!)}
                        className="text-[#65686c] text-[16px] cursor-pointer hover:underline"
                      >
                        Delete
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
        )}
      </div>
    </>
  );
}

export default Comments;
