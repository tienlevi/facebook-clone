import { useState } from "react";

const imageType = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
const videoType = ["video/mp4"];

function usePreview() {
  const [file, setFile] = useState();
  const [fileType, setFileType] = useState<string>("");

  const handleChangeFile = (e: any) => {
    const selectFile = e.target.files[0];
    setFile(URL.createObjectURL(selectFile) as any);
    if (imageType.includes(selectFile?.type)) {
      setFileType("image");
    }
    if (videoType.includes(selectFile?.type)) {
      setFileType("video");
    }
  };

  return { file, fileType, handleChangeFile };
}

export default usePreview;
