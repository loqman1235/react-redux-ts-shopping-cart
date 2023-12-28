import { MdAdd, MdRemove } from "react-icons/md";
import { IProduct } from "../types";
import formatPrice from "../utils/formatPrice";
import useCart from "../hooks/useCart";
import { FiXCircle } from "react-icons/fi";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CartProduct: React.FC<IProduct> = ({ id, title, price, image, qty }) => {
  const { removeProduct, incrementQuantity, decrementQuantity } = useCart();

  return (
    <div className="w-full flex items-center justify-between border-b border-b-neutral-200 pb-5 last:pb-0 last:border-none">
      <div className="flex items-center gap-3 flex-1 h-full ">
        {/* Product Image */}
        <div className="w-16 h-16 overflow-hidden bg-neutral-200">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col justify-center h-full">
          <h3 className="mb-px w-full font-medium text-sm">
            {title.length > 15 ? title.slice(0, 15) + "..." : title}
          </h3>
          <p className="text-sm">Qty: {qty}</p>
          <h3 className="text-[#00796b]  font-medium text-sm">
            {formatPrice(price)}
          </h3>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-3 bg-neutral-100 px-2 py-1 rounded">
          <button className="font-bold" onClick={() => decrementQuantity(id)}>
            <MdRemove size={16} />
          </button>

          <span className="font-semibold border-r border-l border-right-neutral-200 border-left-neutral-200 px-4">
            {qty}
          </span>

          <button className="font-bold" onClick={() => incrementQuantity(id)}>
            <MdAdd size={16} />
          </button>
        </div>
        <button
          className="text-red-700"
          onClick={() => removeProduct(id, title)}
        >
          <FiXCircle size={16} />
        </button>
      </div>
    </div>
  );
};
export default CartProduct;
