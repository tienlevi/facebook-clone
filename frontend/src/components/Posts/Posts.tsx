import { Post } from "@/interface";

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
                src={item.userInfo?.avatar}
                alt=""
                width={40}
                height={40}
                className="rounded-full w-[40px] h-[40px] object-cover"
              />
            </div>
            <div className="flex flex-col ml-2">
              <p className="text-[15px] font-semibold">{item.userInfo?.name}</p>
              <p className="text-[14px] text-[rgb(101,103,107)]">
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
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
