import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

console.log("API_BASE_URL", process.env.NEXT_PUBLIC_API_URL);
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchProducts = async (filters: any) => {
  console.log("filters", filters);
  const { data } = await axios.get(
    `${API_BASE_URL}/companies/${filters.company}/categories/${filters.category}/products`,
    {
      params: {
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        page: filters.page,
        top: filters.top,
      },
    }
  );
  return data;
};

export const fetchProductDetails = async (
  companyName: string,
  categoryName: string,
  productId: string
) => {
  const { data } = await axios.get(
    `${API_BASE_URL}/companies/${companyName}/categories/${categoryName}/products/${productId}`
  );
  return data;
};
