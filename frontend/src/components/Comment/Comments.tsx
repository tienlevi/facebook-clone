import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Comment as CommentInterface } from "@/interface";
import { getCommentByPostId } from "@/services/comment";

interface Props {
  postId: string;
}

function Comments({ postId }: Props) {
  const { data } = useQuery<CommentInterface[]>({
    queryKey: ["comments"],
    queryFn: async () => {
      return await getCommentByPostId(postId);
    },
  });

  return (
    <>
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
              <div className="flex flex-col ml-4 py-1 px-3 w-[90%] bg-[#f0f2f5] rounded-lg">
                <p className="text-[18px] font-bold leading-8">
                  {comment.name}
                </p>
                <p className="text-[15px]">{comment.content}</p>
              </div>
            </div>
          )
      )}
    </>
  );
}

export default Comments;
