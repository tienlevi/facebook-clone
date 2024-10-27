import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import File from "../Posts/File";
import usePreview from "@/hooks/usePreview";
import { updateAvatar } from "@/services/user";
import { UploadCloundinary } from "@/utils/cloudinary";
import { toast } from "react-toastify";

interface Props {
  onOpenModel?: () => void;
}

function UploadAvatar({ onOpenModel }: Props) {
  const { user } = useAuth();
  const { file, fileType, handleChangeFile } = usePreview();
  const fileRef = useRef<HTMLInputElement>(null);
  const { mutate, isPending } = useMutation({
    mutationKey: ["user"],
    mutationFn: async () => {
      const fileCloudinary = await UploadCloundinary(
        fileRef.current?.files?.[0] ?? ""
      );
      const response = await updateAvatar(user?._id!, {
        name: user?.name,
        avatar: fileCloudinary?.secure_url,
      });
      console.log(response);
      return response;
    },
    onSuccess: () => {
      toast.success("Upload Avatar success");
    },
  });
  return (
    <div
      style={{ zIndex: 100 }}
      className="fixed w-3/4 py-2 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-[8px] bg-white shadow-[0_12px_28px_0_rgba(0,0,0,0.2)] overflow-auto"
    >
      <div className="text-[22px] text-center py-5 font-bold border-b border-[rgb(228,230,235)]">
        Choose profile picture
      </div>
      <div
        onClick={onOpenModel}
        className="absolute top-5 right-5 cursor-pointer"
      >
        <IoMdClose style={{ fontSize: 25 }} />
      </div>
      <div className="px-2">
        <input
          type="file"
          ref={fileRef}
          onChange={handleChangeFile}
          id="actual-btn"
          hidden
        />
        <div className="relative bg-[rgb(92%,96%,100%)] mt-2 h-10 text-[#0866ff] text-[18px] font-bold rounded-[8px]">
          <label
            htmlFor="actual-btn"
            className="flex items-center justify-center absolute top-0 left-0 right-0 bottom-0 cursor-pointer"
          >
            Upload Photo
          </label>
        </div>
        <div className="mt-5 h-[400px]">
          {fileType !== "" ? (
            <div className="flex flex-col items-center">
              <File
                fileType={fileType}
                fileSrc={file!}
                className="w-1/4 h-full object-cover mx-auto"
              />
              {isPending ? (
                <div className="w-1/5 my-3 py-2 text-center bg-blue-500 text-white font-bold rounded-[8px]">
                  Loading...
                </div>
              ) : (
                <div
                  onClick={() => mutate()}
                  className="w-1/5 my-3 py-2 text-center bg-blue-500 text-white font-bold rounded-[8px] cursor-pointer"
                >
                  Save
                </div>
              )}
            </div>
          ) : (
            <Image
              src={user?.avatar!}
              width={300}
              height={300}
              alt=""
              className="w-1/4 h-full object-contain mx-auto"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default UploadAvatar;
