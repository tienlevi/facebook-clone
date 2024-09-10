import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonLoading() {
  return (
    <div className="relative block bg-white rounded-[8px] p-4 shadow-[0_1px_2px_0_rgba(0,0,0,0.2)] my-4">
      <div className="flex items-center justify-between">
        <div className="flex">
          <div className="w-full">
            <Skeleton width={40} height={40} circle={true} />
          </div>
          <div className="flex flex-col ml-2">
            <Skeleton width={150} />
            <Skeleton width={150} />
          </div>
        </div>
      </div>
      <Skeleton width={300} className="mt-4" />
      <Skeleton width={"100%"} height={300} className="mt-4" />
    </div>
  );
}

export default SkeletonLoading;
