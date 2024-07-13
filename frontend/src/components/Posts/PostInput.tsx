import { useState, useRef } from "react";
import { FaImages } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";
import UploadCloundinary from "@/utils/upload";

interface Props {
  onPost: (data: any) => void;
}

function PostInput({ onPost }: Props) {
  const { user } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const imageRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    const imageCloudinary = await UploadCloundinary(
      imageRef.current?.files?.[0]
    );
    onPost({
      ...data,
      userId: user._id,
      userInfo: { name: user.name, avatar: user.avatar },
      image: imageCloudinary,
    });
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
      {open && <div className="my-5"></div>}
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
        <button
          type="submit"
          className="bg-blue-500 w-[100px] text-white py-2 flex items-center justify-center mt-4 rounded-[10px] cursor-pointer"
        >
          Post
        </button>
      </div>
    </form>
  );
}

export default PostInput;
