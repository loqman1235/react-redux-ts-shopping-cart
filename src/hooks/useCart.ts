// Hook for adding, remove , incrementing , decrementing product in localstorage

import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { IProduct } from "../types";
import { toast } from "react-toastify";
import {
  addItemToCart,
  decrementQty,
  deleteProduct,
  incrementQty,
} from "../features/cartSlice";

const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();

  const getStoredCartItems = (): IProduct[] => {
    return JSON.parse(localStorage.getItem("cartItems") ?? "[]");
  };

  const updateStoredCartItems = (cartItems: IProduct[]) => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  const addProduct = (product: IProduct) => {
    const storedCartItems: IProduct[] = getStoredCartItems();

    // Check if product already exists then increase qty if not then add it
    const existingProduct: IProduct | undefined = storedCartItems.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      existingProduct.qty = (existingProduct.qty ?? 0) + 1;
    } else {
      storedCartItems.push(product);
    }

    // Update cart items in localStorage
    updateStoredCartItems(storedCartItems);
    dispatch(addItemToCart(product));
    toast.success(`${product.title} has been added to your cart`);
  };

  const removeProduct = (productId: number, title: string) => {
    const storedCartItems: IProduct[] = getStoredCartItems();

    const existingProduct: IProduct | undefined = storedCartItems.find(
      (item) => item.id === productId
    );

    // If Product exists in cart then remove it else do nothing
    if (!existingProduct) return;

    const updatedStoredItems = storedCartItems.filter(
      (item) => item.id !== productId
    );

    updateStoredCartItems(updatedStoredItems);
    dispatch(deleteProduct({ id: productId }));
    toast.error(`${title} has been removed from your cart`);
  };

  const incrementQuantity = (productId: number) => {
    const storedCartItems: IProduct[] = getStoredCartItems();

    const existingProduct: IProduct | undefined = storedCartItems.find(
      (item) => item.id === productId
    );
    if (existingProduct) {
      existingProduct.qty = (existingProduct.qty ?? 0) + 1;
      updateStoredCartItems(storedCartItems);
      dispatch(incrementQty({ id: productId }));
    }
  };

  const decrementQuantity = (productId: number) => {
    const storedCartItems: IProduct[] = getStoredCartItems();

    const existingProduct: IProduct | undefined = storedCartItems.find(
      (item) => item.id === productId
    );
    if (existingProduct && existingProduct.qty && existingProduct.qty > 1) {
      existingProduct.qty = (existingProduct.qty ?? 0) - 1;

      updateStoredCartItems(storedCartItems);
      dispatch(decrementQty({ id: productId }));
    }

    // If product quantity is less than 1 remove product from cart
    if (existingProduct && existingProduct.qty && existingProduct.qty === 1) {
      removeProduct(existingProduct.id, existingProduct.title);
      return;
    }
  };

  return {
    addProduct,
    removeProduct,
    incrementQuantity,
    decrementQuantity,
  };
};

export default useCart;
