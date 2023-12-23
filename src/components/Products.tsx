import ProductCard from "./ProductCard";

const Products = () => {
  return (
    <div className="px-5 md:px-10 w-full mb-10">
      <h2 className="text-2xl font-extrabold tracking-tight mb-2">Products</h2>
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-5">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};
export default Products;
