import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Product } from "@/types/Product";

interface ProductCardProps {
  product: Product;
  filters: {
    category: string;
    company: string;
    minPrice: number;
    maxPrice: number;
    top: number;
  };
}

export default function ProductCard({ product, filters }: ProductCardProps) {
  return (
    <Card className="hover:shadow-xl">
      <CardHeader>
        <CardTitle>{product.productName}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Price: ${product.price}</p>
        <p>Category: {product.category}</p>
        <p>Company: {product.company}</p>
        <p>Rating: {product.rating}</p>
        <p>Discount: {product.discount}%</p>
      </CardContent>
      <CardFooter>
        <Link
          href={`/product/${product.productName}?company=${filters.company}&category=${filters.category}`}
        >
          <Button>View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
