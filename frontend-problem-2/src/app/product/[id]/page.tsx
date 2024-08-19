"use client";
import ProductDetails from "@/components/ProductDetails";
import { Product } from "@/types/Product";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  const fetchProductDetails = async () => {
    // Implement API call to fetch product details
    // Update setProduct with the fetched data
  };

  if (!product) return <div>Loading...</div>;

  return <ProductDetails product={product} />;
}
