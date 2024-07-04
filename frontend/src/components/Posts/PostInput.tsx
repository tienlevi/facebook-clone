import { FaImages } from "react-icons/fa";

function PostInput() {
  return (
    <div className="block bg-white rounded-[8px] p-4 shadow-[0_1px_2px_0_rgba(0,0,0,0.2)]">
      <div className="flex pb-4 border-b border-[rgb(228,230,235)]">
        <img
          src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-1/339750921_3361707387400982_1307641247829571121_n.jpg?stp=c0.6.40.40a_cp0_dst-jpg_p40x40&_nc_cat=104&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGNOMcjsDuES8GouTKzJ5WJoK9xBZgVWRigr3EFmBVZGKULh5tPz0R_QGytvkJOIhLEACF62RwbN5nszpxn7iFk&_nc_ohc=bzT7BKXsgCAQ7kNvgF48zTD&_nc_ht=scontent.fhan15-2.fna&oh=00_AYDZo4n0ER7l2rnJGZw5AnH5GZtgX9gkWFylDexBZh70fA&oe=668BD0BF"
          alt=""
          width={35}
          height={35}
          className="rounded-full"
        />
        <input
          type="text"
          className="w-full ml-2 pl-2 text-[rgb(28,30,33)] bg-[rgb(240,242,245)] rounded-[20px] focus:outline-none"
          placeholder="What's on your mind ?"
        />
      </div>
      <div className="flex justify-between">
        <div className="flex items-center mt-4 cursor-pointer">
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
    </div>
  );
}

export default PostInput;
