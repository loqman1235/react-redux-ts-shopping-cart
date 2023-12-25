import { MdAdd } from "react-icons/md";
import { IProduct } from "../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { addItemToCart } from "../features/cartSlice";
import formatPrice from "../utils/formatPrice";
import { toast } from "react-toastify";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ProductCard: React.FC<IProduct> = ({ id, title, price, image }) => {
  const dispatch = useDispatch<AppDispatch>();

  // console.log(cartItems, "Cart items");

  const handleAddToCart = () => {
    dispatch(addItemToCart({ id, title, price, image, qty: 1 }));
    toast.success(`${title} added to your cart`);
  };

  return (
    <div
      className="
      w-full
      h-fit
      shadow-sm
      rounded-xl
      overflow-hidden
      border
      border-neutral-200
    "
    >
      {/* Product Image */}
      <div className="w-full h-[220px] overflow-hidden bg-white p-5 ">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain hover:scale-150 transition duration-300 ease-in-out"
        />
      </div>

      {/* Product details */}
      <div className="p-5 w-full">
        <h3 className="font-bold text-lg mb-px tracking-tight w-full">
          {title}
        </h3>
        <h1 className="text-blue-700 font-bold text-lg mb-5 tracking-tight">
          {formatPrice(price)}
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
          onClick={handleAddToCart}
        >
          <MdAdd size={24} /> Add to cart
        </button>
      </div>
    </div>
  );
};
export default ProductCard;
