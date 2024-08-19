"use client";

import FilterSidebar from "@/components/FilterSidebar";
import Pagination from "@/components/Pagination";
import ProductList from "@/components/ProductList";
import { fetchProducts } from "@/lib/utils";
import { Product } from "@/types/Product";
import { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    category: "Phone",
    company: "AMZ",
    minPrice: 1,
    maxPrice: 100000,
    top: 10,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProductsData = async () => {
      toast.loading("Fetching products...", {
        id: "fetching-products",
      });
      try {
        const data = await fetchProducts({ ...filters, page: currentPage });
        const products = data.products.map((product: any) => ({
          ...product,
          category: filters.category,
          company: filters.company,
        }));
        setProducts(products);
        setTotalPages(data.totalPages);
        toast.success("Products fetched successfully", {
          id: "fetching-products",
        });
      } catch (error) {
        console.error("Error fetching products:", error);
        if (error instanceof AxiosError) {
          toast.error(error.message, {
            id: "fetching-products",
          });
        }
      }
    };
    fetchProductsData();
  }, [filters, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className="flex flex-col min-h-screen p-4">
      <div className="flex flex-1">
        <FilterSidebar filters={filters} setFilters={setFilters} />
        <div className="flex-1">
          {products.length === 0 && (
            <div className="w-full h-[200px] flex justify-center items-center border mb-4">
              <div className="text-center ">No products found</div>
            </div>
          )}
          <ProductList products={products} filters={filters} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </main>
  );
}
