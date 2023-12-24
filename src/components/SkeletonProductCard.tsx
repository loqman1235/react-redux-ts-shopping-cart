import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonProductCard = () => {
  return (
    <div
      className="
    w-full
    h-fit
    shadow-sm
    rounded-xl
    overflow-hidden
  "
    >
      {/* Product Image */}
      <div className="w-full h-[220px] overflow-hidden bg-white rounded-br-xl rounded-bl-xl">
        <Skeleton width="100%" height="100%" />
      </div>

      {/* Product details */}
      <div className="p-5 w-full">
        <h3 className="font-bold text-lg mb-px tracking-tight w-full">
          <Skeleton width="100%" height="100%" />
        </h3>
        <h1 className="text-blue-700 font-bold text-xl mb-5 tracking-tight">
          <Skeleton width="80%" height="100%" />
        </h1>
      </div>
    </div>
  );
};
export default SkeletonProductCard;
