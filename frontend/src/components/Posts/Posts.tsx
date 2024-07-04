import { formatDistance } from "date-fns";

function Posts() {
  const result = formatDistance(
    new Date(2014, 6, 2),
    new Date().toLocaleDateString(),
    { addSuffix: true }
  );
  return (
    <div className="block mt-2">
      <div className="block bg-white rounded-[8px] p-4 shadow-[0_1px_2px_0_rgba(0,0,0,0.2)] my-4">
        <div className="flex">
          <div className="block">
            <img
              src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/449042605_2819251904897132_2522396392886580363_n.jpg?stp=cp6_dst-jpg_p100x100&_nc_cat=102&ccb=1-7&_nc_sid=50d2ac&_nc_eui2=AeFtoO6BgQv-Ynd-47IKnxGIAxn7wC7QwzoDGfvALtDDOgf7eD0qsNCGHM-OTcYR8YlL2ZaCpI7wAhYOwv5sMEZl&_nc_ohc=GFEEfcUSgW8Q7kNvgFk5nXE&_nc_ht=scontent.fhan15-1.fna&oh=00_AYD5nKFWYgP1nVxDy-CS7Wo6X7WRC1Zt0Z71y6yOxfwZIg&oe=668BC81D"
              alt=""
              width={35}
              height={35}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col ml-2">
            <p className="text-[15px] font-semibold">Nguyễn Trạch Tiến</p>
            <p className="text-[14px] text-[rgb(101,103,107)]">{result}</p>
          </div>
        </div>
        <div className="text-[17px] my-2">
          Mó mấy viên đá mà ngày nào cũng đăng thôi. Hhh.Mó mấy viên đá mà ngày
          nào cũng đăng thôi. Hhh.
        </div>
        <div className="w-full">
          <img
            src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/448728484_1663416531090637_6530854551409645918_n.jpg?stp=cp6_dst-jpg_s600x600&_nc_cat=101&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeFy5-oPVAN2RH7pQcszJKUnHoBkdg3IsukegGR2Dciy6XRC97HP4IpKZ6opv0jMocdyDcv_6stHaqz6xmwHbpN9&_nc_ohc=3TBzu1chNS8Q7kNvgFjzyer&_nc_ht=scontent.fhan15-1.fna&oh=00_AYAZpo90DgrFq0_lrvyMEW80Y3lczz9Ia1d1olJgIi7tFQ&oe=668C008C"
            alt=""
            className="w-full object-cover"
          />
        </div>
      </div>
      <div className="block bg-white rounded-[8px] p-4 shadow-[0_1px_2px_0_rgba(0,0,0,0.2)] my-4">
        <div className="flex">
          <div className="block">
            <img
              src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/449042605_2819251904897132_2522396392886580363_n.jpg?stp=cp6_dst-jpg_p100x100&_nc_cat=102&ccb=1-7&_nc_sid=50d2ac&_nc_eui2=AeFtoO6BgQv-Ynd-47IKnxGIAxn7wC7QwzoDGfvALtDDOgf7eD0qsNCGHM-OTcYR8YlL2ZaCpI7wAhYOwv5sMEZl&_nc_ohc=GFEEfcUSgW8Q7kNvgFk5nXE&_nc_ht=scontent.fhan15-1.fna&oh=00_AYD5nKFWYgP1nVxDy-CS7Wo6X7WRC1Zt0Z71y6yOxfwZIg&oe=668BC81D"
              alt=""
              width={35}
              height={35}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col ml-2">
            <p className="text-[15px] font-semibold">Nguyễn Trạch Tiến</p>
            <p className="text-[14px] text-[rgb(101,103,107)]">{result}</p>
          </div>
        </div>
        <div className="text-[17px] my-2">
          Mó mấy viên đá mà ngày nào cũng đăng thôi. Hhh.Mó mấy viên đá mà ngày
          nào cũng đăng thôi. Hhh.
        </div>
        <div className="w-full">
          <img
            src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/448728484_1663416531090637_6530854551409645918_n.jpg?stp=cp6_dst-jpg_s600x600&_nc_cat=101&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeFy5-oPVAN2RH7pQcszJKUnHoBkdg3IsukegGR2Dciy6XRC97HP4IpKZ6opv0jMocdyDcv_6stHaqz6xmwHbpN9&_nc_ohc=3TBzu1chNS8Q7kNvgFjzyer&_nc_ht=scontent.fhan15-1.fna&oh=00_AYAZpo90DgrFq0_lrvyMEW80Y3lczz9Ia1d1olJgIi7tFQ&oe=668C008C"
            alt=""
            className="w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Posts;
