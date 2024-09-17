import React from "react";
interface Props {
  fileType: string;
  fileSrc: string;
}

function File({ fileType, fileSrc }: Props) {
  return (
    <div className="w-full">
      {fileType === "image" && (
        <img src={fileSrc} alt="" className="w-full object-cover" />
      )}
      {fileType === "video" && (
        <video controls className="w-full">
          <source src={fileSrc} type="video/mp4" className="object-cover" />
        </video>
      )}
    </div>
  );
}

export default File;
