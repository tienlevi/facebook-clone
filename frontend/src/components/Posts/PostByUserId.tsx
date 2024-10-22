import { Post } from "@/interface";
import { getPostByUserId } from "@/services/post";
import { useQuery } from "@tanstack/react-query";
import PostItems from "./PostItems";
import SkeletonLoading from "../Loading/SkeletonLoading";

interface Props {
  userId: string;
}

function PostByUserId({ userId }: Props) {
  const { data, isLoading } = useQuery<Post[]>({
    queryKey: ["post", userId],
    queryFn: async () => {
      return await getPostByUserId(userId);
    },
  });

  return (
    <div className="relative block mt-2">
      {isLoading && <SkeletonLoading />}
      {data && <PostItems posts={data} key={userId} />}
    </div>
  );
}

export default PostByUserId;
