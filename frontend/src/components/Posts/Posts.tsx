import { Post } from "@/interface";
import { formatDistance } from "date-fns";

interface Props {
  posts: Post[];
  editPost?: (data: any) => void;
  deletePost?: (id: string | number) => void;
}

function Posts({ posts, editPost, deletePost }: Props) {
  return (
    <div className="block mt-2">
      {posts?.map((item, index: number) => (
        <div
          key={index}
          className="block bg-white rounded-[8px] p-4 shadow-[0_1px_2px_0_rgba(0,0,0,0.2)] my-4"
        >
          <div className="flex">
            <div className="block">
              <img
                src={item.userInfo?.image}
                alt=""
                width={35}
                height={35}
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col ml-2">
              <p className="text-[15px] font-semibold">{item.userInfo?.name}</p>
              <p className="text-[14px] text-[rgb(101,103,107)]">
                {formatDistance(
                  new Date(item.createdAt),
                  new Date().toLocaleDateString(),
                  {
                    addSuffix: true,
                  }
                )}
              </p>
            </div>
          </div>
          <div className="text-[17px] my-2">{item.title}</div>
          <div className="w-full">
            <img src={item.image} alt="" className="w-full object-cover" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Posts;
