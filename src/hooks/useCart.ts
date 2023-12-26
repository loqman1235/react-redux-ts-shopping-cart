import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import {
  addItemToCart,
  decrementQty,
  deleteProduct,
  incrementQty,
  resetCart,
} from "../features/cartSlice";
import { toast } from "react-toastify";
import { IProduct } from "../types";

// Bug: It only saves one cart product in localStorage

const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();

  const storeCartItemsString = localStorage.getItem("cartItems");
  const storedCartItems: IProduct[] | null = storeCartItemsString
    ? JSON.parse(storeCartItemsString)
    : null;

  //   Add Item to localStorage
  const addProduct = (product: IProduct) => {
    let updatedProducts: string;

    if (storedCartItems) {
      const existingProductIndex = storedCartItems.findIndex(
        (item) => item.id === product.id
      );

      //   Check if the product already exists if not increament qty by 1
      if (existingProductIndex !== -1) {
        storedCartItems[existingProductIndex].qty =
          (storedCartItems[existingProductIndex].qty || 0) + 1;

        updatedProducts = JSON.stringify([...storedCartItems]);
      } else {
        updatedProducts = JSON.stringify([...storedCartItems, product]);
      }

      localStorage.setItem("cartItems", updatedProducts);
      toast.success(`${product.title} has been added into your cart`);
    } else {
      updatedProducts = JSON.stringify([product]);
      localStorage.setItem("cartItems", updatedProducts);
    }
    dispatch(addItemToCart(product));
  };

  //   Remove item from localStorage
  const removeProduct = (id: number, title: string) => {
    if (storedCartItems) {
      const updatedStoredCartItems = JSON.stringify(
        storedCartItems.filter((item) => item.id !== id)
      );
      localStorage.setItem("cartItems", updatedStoredCartItems);
    }
    dispatch(deleteProduct({ id }));
    toast.error(`${title} has been removed from your cart`);
  };

  //   Increment and decrement qty
  const incrementQuantity = (id: number) => {
    dispatch(incrementQty({ id }));

    if (storedCartItems) {
      const existingProductIndex = storedCartItems.findIndex(
        (item) => item.id === id
      );

      if (existingProductIndex !== -1) {
        const existingProduct = storedCartItems[existingProductIndex];
        const currentQty = existingProduct.qty ?? 0;

        existingProduct.qty = currentQty + 1;
        localStorage.setItem("cartItems", JSON.stringify([...storedCartItems]));
      }
    }
  };

  //   decrement and decrement qty
  const decrementQuantity = (id: number) => {
    dispatch(decrementQty({ id }));

    if (storedCartItems) {
      const existingProductIndex = storedCartItems.findIndex(
        (item) => item.id === id
      );

      if (existingProductIndex !== -1) {
        const existingProduct = storedCartItems[existingProductIndex];
        const currentQty = existingProduct.qty ?? 0;

        if (currentQty > 1) {
          existingProduct.qty = currentQty - 1;
          localStorage.setItem(
            "cartItems",
            JSON.stringify([...storedCartItems])
          );
        }
      }
    }
  };

  // Reset cart in storage (clean all items)
  const resetCartItemsStore = () => {
    dispatch(resetCart());
    if (storedCartItems) {
      localStorage.removeItem("cartItems");
    }
  };

  return {
    addProduct,
    removeProduct,
    incrementQuantity,
    decrementQuantity,
    resetCartItemsStore,
    storedCartItems,
  };
};

export default useCart;
