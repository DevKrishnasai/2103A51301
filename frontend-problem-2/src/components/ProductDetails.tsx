import { Product } from "../types/Product";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover mb-4"
      />
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      <p>Company: {product.company}</p>
      <p>Rating: {product.rating}</p>
      <p>Availability: {product.availability ? "In Stock" : "Out of Stock"}</p>
      {/* Add more details as needed */}
    </div>
  );
}
