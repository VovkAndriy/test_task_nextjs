"use client";
import React, { useEffect, useState } from "react";
import { getAllProducts, getProductsByCategory } from "../lib/api";
import ProductCard from "../components/products-card/ProductCard";
import ProductFilters from "../components/products-filters/ProductFilters";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts: Product[] = await getAllProducts();
        setProducts(allProducts);
        setFilteredProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let updatedProducts = products;

    if (searchTerm) {
      updatedProducts = updatedProducts.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(updatedProducts);
  }, [searchTerm, products]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      if (!selectedCategory) {
        setFilteredProducts(products);
        return;
      }

      try {
        const categoryProducts: Product[] = await getProductsByCategory(
          selectedCategory
        );
        setFilteredProducts(categoryProducts);
      } catch (error) {
        console.error("Error fetching category products:", error);
      }
    };

    fetchCategoryProducts();
  }, [selectedCategory, products]);

  useEffect(() => {
    const sortedProducts = [...filteredProducts];

    if (sortOrder === "price-asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-desc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "name-asc") {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "name-desc") {
      sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredProducts(sortedProducts);
  }, [sortOrder]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">All Products</h1>

      <ProductFilters
        onSearch={(term: string) => setSearchTerm(term)}
        onFilter={(category: string) => setSelectedCategory(category)}
        onSort={(order: string) => setSortOrder(order)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
