import Link from "next/link";
import { User } from "@/interface";
import Image from "next/image";
import { defaultAvatar } from "@/constant";

interface Props {
  loading?: boolean;
  lists: User[];
}

function Dropdown({ loading, lists }: Props) {
  return (
    <div className="w-[280px] max-h-[calc(-50px+80vh)] shadow-[0_12px_12px_rgba(0,0,0,0.2)] absolute left-[70px] top-[60px] bg-white p-2 overflow-y-auto rounded-[5px]">
      <div className="flex flex-col">
        {loading && <p>Loading...</p>}
        {lists?.length === 0 && <p>Not found</p>}
        {lists?.map((list) => (
          <Link
            href={`/profile/${list._id}`}
            scroll={true}
            key={list._id}
            className="flex items-center my-1 p-2 rounded-[5px] hover:bg-[#E4E6EB]"
          >
            <Image
              src={list.avatar ? list.avatar : defaultAvatar}
              width={40}
              height={40}
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
            <p className="ml-2">{list.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Dropdown;
