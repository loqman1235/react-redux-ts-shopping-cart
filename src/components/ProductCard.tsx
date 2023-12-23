import { MdAdd } from "react-icons/md";

const ProductCard = () => {
  return (
    <div
      className="
      w-full
      shadow-2xl
      rounded-xl
      overflow-hidden
    "
    >
      {/* Product Image */}
      <div className="w-full h-[220px] overflow-hidden bg-neutral-100 rounded-br-xl rounded-bl-xl">
        <img
          src="https://static.nike.com/a/images/f_auto,cs_srgb/w_1536,c_limit/g1ljiszo4qhthfpluzbt/nike-joyride.jpg"
          alt="product"
          className="w-full h-full object-cover hover:scale-150 transition duration-300 ease-in-out"
        />
      </div>

      {/* Product details */}
      <div className="p-5 w-full">
        <h3 className="font-bold text-lg mb-px tracking-tight w-full">
          Nike Joyride
        </h3>
        <h1 className="text-blue-700 font-bold text-xl mb-5 tracking-tight">
          $200.99
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
