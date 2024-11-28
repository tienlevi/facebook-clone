import Image from "next/image";

interface Props {
  image: string;
}

function PreviewAvatar({ image }: Props) {
  return (
    <div
      style={{ zIndex: 100 }}
      className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
    >
      <Image
        src={image}
        alt=""
        width={300}
        height={300}
        className="w-[300px] h-[300px]"
      />
    </div>
  );
}

export default PreviewAvatar;
