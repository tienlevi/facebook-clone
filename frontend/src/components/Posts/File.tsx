import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  fileType: string;
  fileSrc: string;
}

function File({ fileType, fileSrc, ...props }: Props) {
  return (
    <div {...props}>
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
