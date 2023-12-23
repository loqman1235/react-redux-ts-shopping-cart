import { MdAdd } from "react-icons/md";
import { IProduct } from "../types";

const ProductCard: React.FC<IProduct> = ({ id, title, price, image }) => {
  return (
    <div
      className="
      w-full
      shadow-md
      rounded-xl
      overflow-hidden
    "
    >
      {/* Product Image */}
      <div className="w-full h-[220px] overflow-hidden bg-neutral-100 rounded-br-xl rounded-bl-xl">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-150 transition duration-300 ease-in-out"
        />
      </div>

      {/* Product details */}
      <div className="p-5 w-full">
        <h3 className="font-bold text-lg mb-px tracking-tight w-full">
          {title}
        </h3>
        <h1 className="text-blue-700 font-bold text-xl mb-5 tracking-tight">
          ${price}
        </h1>
        <button
          className="
        w-full
        px-4 
        py-3
        bg-blue-700
        flex 
        items-center 
        justify-center
        rounded-md
        font-bold
        text-lg
        text-white
        hover:bg-blue-800
        transition
        gap-2
        "
        >
          <MdAdd size={24} /> Add to cart
        </button>
      </div>
    </div>
  );
};
export default ProductCard;
