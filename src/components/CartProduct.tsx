import { MdAdd, MdRemove } from "react-icons/md";

const CartProduct = () => {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-3 flex-1">
        {/* Product Image */}
        <div className="w-16 h-16 overflow-hidden rounded-md">
          <img
            src="https://static.nike.com/a/images/f_auto,cs_srgb/w_1536,c_limit/g1ljiszo4qhthfpluzbt/nike-joyride.jpg"
            alt="product"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="font-bold text-base tracking-tigh w-full">
            Nike Joyride
          </h2>
          <h3 className="text-blue-700 font-bold ">$200.99</h3>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3 bg-neutral-100 px-2 py-1 rounded">
        <button className="font-bold">
          <MdRemove size={20} />
        </button>

        <span className="font-semibold border-r border-l border-right-neutral-200 border-left-neutral-200 px-4">
          0
        </span>

        <button className="font-bold">
          <MdAdd size={20} />
        </button>
      </div>
    </div>
  );
};
export default CartProduct;
