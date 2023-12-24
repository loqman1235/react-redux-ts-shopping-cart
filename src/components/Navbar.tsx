import { MdClose, MdShoppingBasket, MdCreditCard } from "react-icons/md";
import CartProduct from "./CartProduct";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { CartState } from "../features/cartSlice";
import formatPrice from "../utils/formatPrice";

const Navbar = () => {
  const [showCartMenu, setShowCartMenu] = useState(false);
  const cartMenuRef = useRef<HTMLDivElement | null>(null);
  const { cartItems, totalAmount } = useSelector<RootState, CartState>(
    (state: RootState) => state.cart
  );

  console.log(totalAmount, "TOTAL AMOUNT");

  const toggleCartMenu = () => {
    setShowCartMenu(!showCartMenu);
  };

  // When user clicks outside the cart menu, the cart menu closes
  const handleClickOutside = (event: MouseEvent) => {
    if (
      !cartMenuRef.current?.contains(event.target as Node) &&
      event.button === 0
    ) {
      setShowCartMenu(false);
    }
  };

  useEffect(() => {
    if (showCartMenu) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCartMenu]);

  return (
    <>
      <div
        className="
        w-full 
        h-16
        bg-white/90
        border-b 
        border-b-neutral-200
        flex 
        items-center
        justify-between 
        px-5
        md:px-10
        fixed 
        top-0
        z-10
        backdrop-blur-md
        "
      >
        <h2 className="text-2xl font-extrabold tracking-tight select-none cursor-pointer">
          Buy<span className="text-blue-700">.it</span>
        </h2>

        {/* Cart Button */}

        <button className="relative" onClick={toggleCartMenu}>
          <MdShoppingBasket size={24} />
          {cartItems.length > 0 && (
            <span className="absolute -right-1 -top-1 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white">
              {cartItems.length}
            </span>
          )}
        </button>
      </div>

      {/* Cart Menu*/}

      <div
        className={`
      h-screen
       w-[400px] 
       fixed 
       right-0 
       top-0 
       bg-white 
       z-20 
       p-5
       shadow-2xl
       transition-transform
       duration-700
       cubic-bezier(0.68, -0.55, 0.27, 1.55)
       ${showCartMenu ? "translate-x-0" : "translate-x-[200%] fadeOutAnimation"}
       `}
        ref={cartMenuRef}
      >
        {/* Cart Header */}
        <div className="w-full flex items-center justify-between mb-5">
          <h1 className="text-xl font-bold flex items-center gap-2">
            Your cart{" "}
            {cartItems.length > 0 && (
              <span className="w-5 h-5 rounded-full flex items-center justify-center bg-blue-500 text-white text-xs">
                {cartItems.length}
              </span>
            )}
          </h1>
          <button
            className=" hover:text-neutral-700 transition"
            onClick={toggleCartMenu}
          >
            <MdClose size={24} />
          </button>
        </div>
        <hr />

        <div className="max-h-[calc(100vh-200px)] overflow-auto scrollbar">
          {cartItems.length > 0 ? (
            <>
              {/* Cart body */}
              <div className="flex flex-col py-5 gap-5">
                {cartItems.map((item) => (
                  <CartProduct key={item.id} {...item} />
                ))}
              </div>
            </>
          ) : (
            <p className="text-neutral-400 pt-5">Cart has not items yet</p>
          )}
        </div>

        {cartItems.length > 0 && (
          <>
            <hr />
            <div>
              <div className="flex items-center justify-between py-5">
                <h3 className="font-bold text-lg tracking-tight">Total</h3>
                <h1 className="text-blue-700 font-bold text-lg">
                  {formatPrice(totalAmount)}
                </h1>
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
        )}
      </div>
    </>
  );
};
export default Navbar;
