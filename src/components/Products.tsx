import ProductCard from "./ProductCard";
import api from "../services/api";
import { useEffect, useState } from "react";
import { IProduct } from "../types";
import { toast } from "react-toastify";

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
    <div className="px-5 md:px-10 w-full mb-10">
      <h2 className="text-2xl font-extrabold tracking-tight mb-2">Products</h2>
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-5">
        {loading ? (
          <p>Loading...</p>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))
        )}
      </div>
    </div>
  );
};
export default Products;
