import { useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { UploadCloundinary } from "@/utils/cloudinary";
import { Post } from "@/interface";
import { editPost } from "@/services/post";
import usePreview from "@/hooks/usePreview";
import useAuth from "@/hooks/useAuth";
import File from "./File";

interface Props {
  onSelectPost: (value: any) => {};
  filePostType?: string;
  fileSrc?: string;
}

function FormEdit({ onSelectPost, filePostType, fileSrc }: Props) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useFormContext();
  const { user } = useAuth();
  const fileRef = useRef<HTMLInputElement>(null);
  const { file, fileType, handleChangeFile } = usePreview();
  const limitSizeMB = (fileRef.current?.files?.[0]?.size as number) / 1024 ** 2;
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["posts"],
    mutationFn: async (data: Post) => {
      const fileCloudinary = await UploadCloundinary(
        fileRef.current?.files?.[0] ?? ""
      );
      return await editPost({
        ...data,
        userId: user?._id,
        userInfo: { name: user?.name, avatar: user?.avatar },
        publicId: fileCloudinary?.public_id || "",
        fileSrc: fileCloudinary?.secure_url || "",
        fileType: fileType,
      });
    },
    onSuccess: (data: any) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        toast.success("Post success");
        onSelectPost(null);
      } else {
        toast.error("Post failed");
        onSelectPost(null);
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const handleEdit = async (data: any) => {
    if (limitSizeMB > 50) {
      return toast.warning("Please select a file less than 50MB");
    }
    mutate(data);
  };
  return (
    <form
      onSubmit={handleSubmit(handleEdit)}
      className="block bg-white rounded-[8px] p-4 shadow-[0_1px_2px_0_rgba(0,0,0,0.2)]"
    >
      <div className="flex pb-4 border-b border-[rgb(228,230,235)]">
        <textarea
          {...register("title", { required: true })}
          disabled={isSubmitting}
          className="w-full ml-2 pl-2 text-[rgb(28,30,33)] bg-[rgb(240,242,245)] rounded-[20px] resize-none focus:outline-none"
        ></textarea>
        <p className="text-red-500">
          {errors?.title && (errors.title.message as string)}
        </p>
      </div>
      <div className="my-5">
        <File fileType={fileType} fileSrc={file!} />
        {fileType === "" && filePostType === "image" && (
          <img src={fileSrc} alt="" className="w-full object-cover" />
        )}
        {fileType === "" && filePostType === "video" && (
          <video controls className="w-full">
            <source src={fileSrc} type="video/mp4" className="object-cover" />
          </video>
        )}
        <input type="file" ref={fileRef} onChange={handleChangeFile} />
      </div>
      <div className="flex justify-between">
        {isPending ? (
          <p className="bg-blue-500 w-[100px] text-white py-2 flex items-center justify-center mt-4 rounded-[10px] cursor-pointer">
            Loading...
          </p>
        ) : (
          <>
            <p
              onClick={() => onSelectPost(null)}
              className="bg-red-500 w-[100px] text-white py-2 flex items-center justify-center mt-4 rounded-[10px] cursor-pointer"
            >
              Cancel
            </p>
            <button
              type="submit"
              className="bg-blue-500 w-[100px] text-white py-2 flex items-center justify-center mt-4 rounded-[10px] cursor-pointer"
            >
              Confirm
            </button>
          </>
        )}
      </div>
    </form>
  );
}

export default FormEdit;
