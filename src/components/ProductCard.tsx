import { IProduct } from "../types";
import formatPrice from "../utils/formatPrice";
import useCart from "../hooks/useCart";
import { FiShoppingCart } from "react-icons/fi";

const ProductCard: React.FC<IProduct> = ({ id, title, price, image }) => {
  const { addProduct } = useCart();

  return (
    <div
      className="
      w-full
      h-fit
      overflow-hidden
      animate__animated 
      animate__fadeInUp
    "
    >
      {/* Product Image */}
      <div className="w-full h-[240px] overflow-hidden bg-neutral-200 relative group">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-125 transition duration-300 ease-in-out"
        />

        <div className="w-full h-full flex items-center justify-center absolute top-0 left-0 bg-black/50 gap-2 p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out">
          <button
            className="w-full px-4 py-2 bg-[#00796b] text-white flex items-center justify-center gap-2 shadow"
            onClick={() => addProduct({ id, title, price, image, qty: 1 })}
          >
            <FiShoppingCart /> Add to cart
          </button>
        </div>
      </div>

      {/* Product details */}
      <div className="w-full mt-2">
        <h3 className="mb-px w-full font-medium">
          {title.length > 20 ? title.slice(0, 20) + "..." : title}
        </h3>
        <h4 className="text-[#00796b] mb-5 font-medium">
          {formatPrice(price)}
        </h4>
      </div>
    </div>
  );
};
export default ProductCard;
