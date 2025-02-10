import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://fakestoreapi.com/products";


export const getAllProducts = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
};

export const getProductById = async (id: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getProductsByCategory = async (category: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/category/${category}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching products in category ${category}:`, error);
    throw error;
  }
};
