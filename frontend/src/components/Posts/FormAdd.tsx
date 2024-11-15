import { useRef, useState } from "react";
import { FaImages } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import usePreview from "@/hooks/usePreview";
import { Post } from "@/interface";
import { toast } from "react-toastify";
import { UploadCloundinary } from "@/utils/cloudinary";
import { addPost } from "@/services/post";
import File from "./File";
import TextArea from "../ui/TextArea";

function FormAdd() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { file, fileType, handleChangeFile } = usePreview();
  const limitSizeMB = (fileRef.current?.files?.[0]?.size as number) / 1024 ** 2;
  const { mutate, isPending } = useMutation({
    mutationKey: ["posts"],
    mutationFn: async (data: Post) => {
      const fileCloudinary = await UploadCloundinary(
        fileRef.current?.files?.[0] ?? ""
      );

      return await addPost({
        ...data,
        userId: user?._id,
        userInfo: { name: user?.name, avatar: user?.avatar },
        publicId: fileCloudinary?.public_id || "",
        fileSrc: fileCloudinary?.secure_url || "",
        fileType: fileType,
      });
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        toast.success("Post success");
      } else {
        toast.error("Post failed");
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handlePost = (data: any) => {
    if (limitSizeMB > 50) {
      return toast.warning("Please select a file less than 50MB");
    }
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handlePost)}
      className="block bg-white rounded-[8px] p-4 shadow-[0_1px_2px_0_rgba(0,0,0,0.2)]"
    >
      <div className="flex pb-4 border-b border-[rgb(228,230,235)]">
        <img
          src={user?.avatar}
          alt=""
          width={40}
          height={40}
          className="rounded-full w-[40px] h-[40px] object-cover"
        />
        <TextArea
          {...register("title", { required: "Field cannot be empty" })}
          className="w-full h-full ml-2 pl-2"
          placeholder="What's on your mind ?"
        />
      </div>
      <p className="text-red-500">
        {errors?.title && (errors.title.message as string)}
      </p>
      {open && (
        <div className="my-5">
          <File fileType={fileType} fileSrc={file!} />
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

        <button
          type="submit"
          className="bg-blue-500 w-[100px] text-white py-2 flex items-center justify-center mt-4 rounded-[10px] cursor-pointer"
          disabled={isPending}
        >
          {isPending ? "Loading..." : "Post"}
        </button>
      </div>
    </form>
  );
}

export default FormAdd;
