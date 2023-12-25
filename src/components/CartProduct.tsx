import { MdAdd, MdOutlineDelete, MdRemove } from "react-icons/md";
import { IProduct } from "../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import {
  decrementQty,
  deleteProduct,
  incrementQty,
} from "../features/cartSlice";
import formatPrice from "../utils/formatPrice";
import { toast } from "react-toastify";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CartProduct: React.FC<IProduct> = ({ id, title, price, image, qty }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteProduct = ({ id }: { id: number }) => {
    dispatch(deleteProduct({ id }));
    toast.error(`${title} has been removed from cart`);
  };

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-3 flex-1">
        {/* Product Image */}
        <div className="w-16 h-16 overflow-hidden rounded-md">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <h2 className="font-bold text-base tracking-tigh w-full">
            {title.length > 15 ? title.slice(0, 15) + "..." : title}
          </h2>
          <h3 className="text-blue-700 font-bold ">{formatPrice(price)}</h3>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-3 bg-neutral-100 px-2 py-1 rounded">
          <button
            className="font-bold"
            onClick={() => dispatch(decrementQty({ id }))}
          >
            <MdRemove size={20} />
          </button>

          <span className="font-semibold border-r border-l border-right-neutral-200 border-left-neutral-200 px-4">
            {qty}
          </span>

          <button
            className="font-bold"
            onClick={() => dispatch(incrementQty({ id }))}
          >
            <MdAdd size={20} />
          </button>
        </div>
        <button
          className="text-red-700"
          onClick={() => handleDeleteProduct({ id })}
        >
          <MdOutlineDelete size={20} />
        </button>
      </div>
    </div>
  );
};
export default CartProduct;
