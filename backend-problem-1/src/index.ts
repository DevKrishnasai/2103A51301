import express, { Response, Request } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { axiosProvider } from "./helper/axios-provider";

// Load environment variables from .env file
dotenv.config();

// Create Express server
const app = express();

// Enable CORS for all requests (for now)
app.use(
  cors({
    origin: "*",
  })
);
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// for testing if the server is running
app.get("/", (req, res) => {
  res.json({ message: "server working!" });
});

app.get(
  "/companies/:companyname/categories/:categoryname/products",
  async (req: Request, res: Response) => {
    const { categoryname, companyname } = req.params;
    const { top = 10, minPrice = 1, maxPrice = 1000, page = 1 } = req.query;

    console.log(
      "Fetching products for category:",
      categoryname,
      companyname,
      top,
      minPrice,
      maxPrice,
      page
    );

    try {
      const response = await axiosProvider.get(
        `/companies/${companyname}/categories/${categoryname}/products`,
        {
          params: {
            minPrice,
            maxPrice,
            top,
          },
        }
      );

      const allProducts = response.data;

      const parsedTop = parseInt(top as string);
      const parsedPage = parseInt(page as string);

      // Calculate start and end indices for pagination
      const startIndex = (parsedPage - 1) * parsedTop;
      const endIndex = startIndex + parsedTop;

      // Slice the array to get the requested page of products
      const paginatedProducts = allProducts.slice(startIndex, endIndex);

      res.json({
        products: paginatedProducts,
        currentPage: parsedPage,
        totalPages: Math.ceil(allProducts.length / parsedTop),
        totalProducts: allProducts.length,
        message: "Products fetched successfully",
      });
    } catch (error) {
      console.error("Error fetching products:", (error as any)?.response?.data); //just for any error
      res
        .status(500)
        .json({
          error: "Error fetching products from e-commerce API",
          message: (error as any)?.response?.data.message,
        });
    }
  }
);

app.get(
  "/companies/:companyname/categories/:categoryname/products/:productId",
  async (req, res) => {
    const { categoryname, productId, companyname } = req.params;
    try {
      const response = await axiosProvider.get(
        `${process.env.TEST_SERVER_URL}/companies/${companyname}/categories/${categoryname}/products/${productId}`
      );
      res.json({ data: response.data });
    } catch (error) {
      console.error("Error fetching products:", (error as any)?.response?.data);
      res
        .status(500)
        .json({ error: "Error fetching product details from e-commerce API" });
    }
  }
);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
