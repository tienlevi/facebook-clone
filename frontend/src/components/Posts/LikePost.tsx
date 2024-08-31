import useAuth from "@/hooks/useAuth";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

interface Props {
  postId: any;
  users: [{ userIdLike: string; name: string; avatar: string }];
  likePost: (data: any) => void;
  unlikePost: (data: any) => void;
}

function LikePost({ postId, users, likePost, unlikePost }: Props) {
  const { user } = useAuth();

  return (
    <>
      {users.some((item: any) => item.userIdLike === user?._id) ? (
        <div
          className="w-1/2 flex items-center justify-center py-2 rounded-[10px] hover:bg-[#E4E6EB] cursor-pointer"
          onClick={() => unlikePost(postId)}
        >
          <AiFillLike style={{ fontSize: 25 }} />
          <p className="ml-2">Liked</p>
        </div>
      ) : (
        <div
          className="w-1/2 flex items-center justify-center py-2 rounded-[10px] hover:bg-[#E4E6EB] cursor-pointer"
          onClick={() => likePost(postId)}
        >
          <AiOutlineLike style={{ fontSize: 25 }} />
          <p className="ml-2">Like</p>
        </div>
      )}
    </>
  );
}

export default LikePost;
