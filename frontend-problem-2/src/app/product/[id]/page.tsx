"use client";
import ProductDetails from "@/components/ProductDetails";
import { fetchProductDetails } from "@/lib/utils";
import { Product } from "@/types/Product";
import { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function ProductPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { category: string; compnay: string };
}) {
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    toast.loading("Fetching product details...", {
      id: "fetching-product",
    });
    try {
      const response = await fetchProductDetails(
        searchParams.compnay,
        searchParams.category,
        id
      );
      console.log("response", response);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
      if (error instanceof AxiosError) {
        toast.error(error.message, {
          id: "fetching-product",
        });
      }
    }
  };

  if (!product) return <div>Loading...</div>;

  return <ProductDetails product={product} />;
}
