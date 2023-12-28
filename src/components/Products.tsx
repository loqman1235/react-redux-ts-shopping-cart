import ProductCard from "./ProductCard";
import api from "../services/api";
import { useEffect, useState } from "react";
import { IProduct } from "../types";
import { toast } from "react-toastify";
import SkeletonProductCard from "./SkeletonProductCard";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<IProduct[]>([]);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await api.get("/products");

        if (res.status === 404) {
          toast.error("No posts found");
        }

        const formattedProducts: IProduct[] = res.data.map(
          (product: IProduct) => ({
            id: product.id,
            title: product.title,
            image: product.image,
            price: product.price,
          })
        );

        setProducts(formattedProducts);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading && !products.length === false) {
    return <h3 className="text-neutral-500">No Products found</h3>;
  }

  return (
    <div className="px-5 md:px-10 w-full mb-10 pt-28">
      {/* Page title */}
      <div className="w-full flex items-center justify-center mb-8">
        <h2 className="text-3xl inline-block font-bold font-serif text-center relative after:absolute after:-bottom-3 after:left-1/2 after:-translate-x-1/2 after:h-px after:w-[60%] after:bg-black/50">
          New Arrivals
        </h2>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {loading
          ? Array.from({ length: 10 }).map((_, i) => (
              <SkeletonProductCard key={i} />
            ))
          : products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
      </div>
    </div>
  );
};
export default Products;
