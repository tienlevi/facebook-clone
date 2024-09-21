import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "@/services/post";
import SkeletonLoading from "../Loading/SkeletonLoading";
import PostItems from "./PostItems";
import { Post } from "@/interface";
import useInView from "@/hooks/useInView";

function Posts() {
  const element = useRef<HTMLDivElement>(null);
  const inView = useInView(element);
  const { data, isLoading, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery<Post[]>({
      queryKey: ["posts"],
      queryFn: async ({ pageParam }) => {
        const response = await getPosts(10, pageParam as number);
        return response?.posts;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPage) =>
        lastPage.length ? allPage.length + 1 : null,
    });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoading) return <SkeletonLoading />;

  return (
    <div className="relative block mt-2">
      {data?.pages.map((post) => {
        return <PostItems posts={post} key={post as any} />;
      })}
      {isFetchingNextPage && <SkeletonLoading />}
      <div ref={element}>Loading...</div>
    </div>
  );
}

export default Posts;
