import React from "react";

function Contact() {
  return (
    <div className="sticky top-[60px] w-1/4 ml-5 h-screen">
      <h1 className="text-[19px] font-bold">Contact</h1>
      <div className="flex flex-col">
        <div className="flex items-center my-3">
          <img
            src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/449042605_2819251904897132_2522396392886580363_n.jpg?stp=cp6_dst-jpg_p100x100&_nc_cat=102&ccb=1-7&_nc_sid=50d2ac&_nc_eui2=AeFtoO6BgQv-Ynd-47IKnxGIAxn7wC7QwzoDGfvALtDDOgf7eD0qsNCGHM-OTcYR8YlL2ZaCpI7wAhYOwv5sMEZl&_nc_ohc=GFEEfcUSgW8Q7kNvgFk5nXE&_nc_ht=scontent.fhan15-1.fna&oh=00_AYD5nKFWYgP1nVxDy-CS7Wo6X7WRC1Zt0Z71y6yOxfwZIg&oe=668BC81D"
            alt=""
            width={35}
            height={35}
            className="rounded-full"
          />
          <div className="ml-2">
            <p className="text-[15px] font-semibold">Nguyễn Trạch Tiến</p>
          </div>
        </div>
        <div className="flex items-center my-3">
          <img
            src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/449042605_2819251904897132_2522396392886580363_n.jpg?stp=cp6_dst-jpg_p100x100&_nc_cat=102&ccb=1-7&_nc_sid=50d2ac&_nc_eui2=AeFtoO6BgQv-Ynd-47IKnxGIAxn7wC7QwzoDGfvALtDDOgf7eD0qsNCGHM-OTcYR8YlL2ZaCpI7wAhYOwv5sMEZl&_nc_ohc=GFEEfcUSgW8Q7kNvgFk5nXE&_nc_ht=scontent.fhan15-1.fna&oh=00_AYD5nKFWYgP1nVxDy-CS7Wo6X7WRC1Zt0Z71y6yOxfwZIg&oe=668BC81D"
            alt=""
            width={35}
            height={35}
            className="rounded-full"
          />
          <div className="ml-2">
            <p className="text-[15px] font-semibold">Nguyễn Trạch Tiến</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
