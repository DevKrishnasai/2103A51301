import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const axiosProvider = axios.create({
  baseURL: process.env.TEST_SERVER_URL,
  headers: {
    Authorization: `Bearer ${process.env.TEST_SERVER_TOKEN}`,
    Accept: "application/json",
  },
});
