import Image from "next/image";

interface Props {
  image: string;
}

function PreviewAvatar({ image }: Props) {
  return (
    <div className="fixed w-3/4 py-2 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-[8px] bg-white shadow-[0_12px_28px_0_rgba(0,0,0,0.2)]">
      <Image
        src={image}
        alt=""
        width={0}
        height={0}
        className="w-full h-full"
      />
    </div>
  );
}

export default PreviewAvatar;
