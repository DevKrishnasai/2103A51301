"use client";

import FilterSidebar from "@/components/FilterSidebar";
import Pagination from "@/components/Pagination";
import ProductList from "@/components/ProductList";
import { fetchProducts } from "@/lib/utils";
import { Product } from "@/types/Product";
import { useState, useEffect } from "react";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    category: "Phone",
    company: "AZX",
    minPrice: 1,
    maxPrice: 1000,
    rating: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProductsData();
  }, [filters, currentPage]);

  const fetchProductsData = async () => {
    const data = await fetchProducts({ ...filters, page: currentPage });
    setProducts(data.products);
    setTotalPages(data.totalPages);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className="flex flex-col min-h-screen p-4">
      <div className="flex flex-1">
        <FilterSidebar filters={filters} setFilters={setFilters} />
        <div className="flex-1">
          <ProductList products={products} />
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
