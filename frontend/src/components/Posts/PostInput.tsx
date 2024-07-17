import { useState, useRef } from "react";
import { FaImages } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";
import UploadCloundinary from "@/utils/upload";
import usePreview from "@/hooks/usePreview";
import { toast } from "react-toastify";

interface Props {
  onPost: (data: any) => void;
}

function PostInput({ onPost }: Props) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit } = useForm();
  const { file, fileType, handleChangeFile } = usePreview();
  const limitSizeMB = (fileRef.current?.files?.[0].size as number) / 1024 ** 2;

  const onSubmit = async (data: any) => {
    if (limitSizeMB > 50) {
      return toast.warning("Please select a file less than 50MB");
    }
    try {
      setIsLoading(true);
      const fileCloudinary = await UploadCloundinary(
        fileRef.current?.files?.[0]
      );

      toast.success("Post success");
      onPost({
        ...data,
        userId: user._id,
        userInfo: { name: user.name, avatar: user.avatar },
        fileSrc: fileCloudinary,
        fileType: fileType,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="block bg-white rounded-[8px] p-4 shadow-[0_1px_2px_0_rgba(0,0,0,0.2)]"
    >
      <div className="flex pb-4 border-b border-[rgb(228,230,235)]">
        <img
          src={user.avatar}
          alt=""
          width={40}
          height={40}
          className="rounded-full w-[40px] h-[40px] object-cover"
        />
        <input
          {...register("title", { required: true })}
          type="text"
          className="w-full ml-2 pl-2 text-[rgb(28,30,33)] bg-[rgb(240,242,245)] rounded-[20px] focus:outline-none"
          placeholder="What's on your mind ?"
        />
      </div>
      {open && (
        <div className="my-5">
          {fileType === "image" && <img src={file as any} alt="" />}
          {fileType === "video" && (
            <video controls className="w-full">
              <source src={file} type="video/mp4" className="object-cover" />
            </video>
          )}
          <input type="file" ref={fileRef} onChange={handleChangeFile} />
        </div>
      )}
      <div className="flex justify-between">
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center mt-4 cursor-pointer"
        >
          <FaImages style={{ fontSize: 25, color: "#45bd62" }} />
          <p className="text-[15px] text-[rgb(101,103,107)] font-medium pl-2">
            Photo / Video
          </p>
        </div>
        {isLoading ? (
          <p className="bg-blue-500 w-[100px] text-white py-2 flex items-center justify-center mt-4 rounded-[10px] cursor-pointer">
            Loading...
          </p>
        ) : (
          <button
            type="submit"
            className="bg-blue-500 w-[100px] text-white py-2 flex items-center justify-center mt-4 rounded-[10px] cursor-pointer"
          >
            Post
          </button>
        )}
      </div>
    </form>
  );
}

export default PostInput;
