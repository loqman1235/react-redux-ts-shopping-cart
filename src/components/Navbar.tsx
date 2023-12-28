import {
  FiShoppingCart,
  FiHeart,
  FiUser,
  FiSearch,
  FiX,
  FiCreditCard,
} from "react-icons/fi";
import CartProduct from "./CartProduct";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { CartState } from "../features/cartSlice";
import formatPrice from "../utils/formatPrice";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [showCartMenu, setShowCartMenu] = useState(false);
  const cartMenuRef = useRef<HTMLDivElement | null>(null);
  const { cartItems, totalAmount } = useSelector<RootState, CartState>(
    (state: RootState) => state.cart
  );

  const navbarLinkStyle =
    "font-medium text-[#68778f] hover:text-[#001f3f] transition";
  const navbarLinkActiveStyle = "text-[#001f3f] font-semibold";

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
        <Link to="/" className="text-2xl font-bold font-serif uppercase">
          Fabrica.
        </Link>

        {/* Navbar links */}

        <ul className="flex items-center gap-10">
          <NavLink
            to="/"
            className={({ isActive }) => {
              if (isActive) {
                return navbarLinkActiveStyle;
              }

              return navbarLinkStyle;
            }}
          >
            Home
          </NavLink>

          <NavLink
            to="/new-arrivals"
            className={({ isActive }) => {
              if (isActive) {
                return navbarLinkActiveStyle;
              }

              return navbarLinkStyle;
            }}
          >
            New Arrivals
          </NavLink>

          <NavLink
            to="/collections"
            className={({ isActive }) => {
              if (isActive) {
                return navbarLinkActiveStyle;
              }

              return navbarLinkStyle;
            }}
          >
            Collections
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) => {
              if (isActive) {
                return navbarLinkActiveStyle;
              }

              return navbarLinkStyle;
            }}
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) => {
              if (isActive) {
                return navbarLinkActiveStyle;
              }

              return navbarLinkStyle;
            }}
          >
            Contact
          </NavLink>
        </ul>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <button>
            <FiSearch size={20} />
          </button>

          <button>
            <FiUser size={20} />
          </button>
          <button>
            <FiHeart size={20} />
          </button>
          <button className="relative" onClick={toggleCartMenu}>
            <FiShoppingCart size={20} />
            {cartItems.length > 0 && (
              <span className="absolute -right-[6px] -top-[6px] w-4 h-4 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-bold text-white">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Cart Menu*/}

      <div
        className={`
        flex
        flex-col
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
          <h1 className="text-lg font-semibold flex items-center gap-2">
            Your cart{" "}
            {cartItems.length > 0 && (
              <span className="w-5 h-5 rounded-full flex items-center justify-center bg-neutral-800 text-white text-xs">
                {cartItems.length}
              </span>
            )}
          </h1>
          <button
            className=" hover:text-neutral-700 transition"
            onClick={toggleCartMenu}
          >
            <FiX size={24} />
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
            <p className="text-[#68778f] pt-5">Cart has not items yet</p>
          )}
        </div>

        {cartItems.length > 0 && (
          <>
            <div className="mt-auto">
              <hr />
              <div className="flex items-center justify-between py-5">
                <h3 className="font-semibold">Total</h3>
                <h1 className="text-[#00796b] font-semibold">
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
           font-semibold
           flex
           items-center
           justify-center
           hover:bg-neutral-900 
           transition
           gap-2
           "
              >
                <FiCreditCard size={20} /> Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Navbar;
