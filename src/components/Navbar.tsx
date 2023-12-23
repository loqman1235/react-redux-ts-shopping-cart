import { MdClose, MdShoppingBasket, MdCreditCard } from "react-icons/md";
import CartProduct from "./CartProduct";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [showCartMenu, setShowCartMenu] = useState(false);

  const toggleCartMenu = () => {
    setShowCartMenu(!showCartMenu);
  };

  useEffect(() => {
    showCartMenu
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [showCartMenu]);

  return (
    <>
      <div
        className="
        w-full 
        h-16
        bg-white
        shadow
        flex 
        items-center
        justify-between 
        px-5
        md:px-10
        mb-10
        "
      >
        <h2 className="text-2xl font-extrabold tracking-tight select-none cursor-pointer">
          Buy<span className="text-blue-700">.it</span>
        </h2>

        {/* Cart Button */}

        <button className="relative" onClick={toggleCartMenu}>
          <MdShoppingBasket size={24} />
          <span className="absolute -right-1 -top-1 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white">
            2
          </span>
        </button>
      </div>

      {/* Cart */}

      <div
        className={`
      h-screen
       w-[400px] 
       fixed 
       right-0 
       top-0 
       bg-white 
       z-10 
       p-5
       shadow-2xl
       transition-transform
       duration-500
       ease-out
       ${showCartMenu ? "translate-x-0" : "translate-x-[200%]"}
       `}
      >
        {/* Cart Header */}
        <div className="w-full flex items-center justify-between mb-5">
          <h1 className="text-xl font-bold flex items-center gap-2">
            Your cart{" "}
            <span className="w-5 h-5 rounded-full flex items-center justify-center bg-blue-500 text-white text-xs">
              4
            </span>
          </h1>
          <button
            className=" hover:text-neutral-700 transition"
            onClick={toggleCartMenu}
          >
            <MdClose size={24} />
          </button>
        </div>
        <hr />

        {/* Cart body */}
        <div className="flex flex-col py-5 gap-5">
          <CartProduct />
          <CartProduct />
          <CartProduct />
          <CartProduct />
        </div>
        <hr />

        {/* Cart Footer*/}
        <div className="flex items-center justify-between py-5">
          <h3 className="font-bold text-lg tracking-tight">Total</h3>
          <h1 className="text-blue-700 font-bold text-lg">$200.99</h1>
        </div>
        <button
          className="
            w-full
           px-4
           py-3
           text-lg
           bg-black
           text-white
           font-bold
           flex
           items-center
           justify-center
           rounded-md
           hover:bg-neutral-900 
           transition
           gap-2
           "
        >
          <MdCreditCard size={20} /> Checkout
        </button>
      </div>
    </>
  );
};
export default Navbar;
