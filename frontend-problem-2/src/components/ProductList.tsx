import { Product } from "@/types/Product";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
  filters: {
    category: string;
    company: string;
    minPrice: number;
    maxPrice: number;
    top: number;
  };
}

export default function ProductList({ products, filters }: ProductListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.productName}
          product={product}
          filters={filters}
        />
      ))}
    </div>
  );
}
