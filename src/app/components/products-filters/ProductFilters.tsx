"use client";
import { getAllCategories } from "@/app/lib/api";
import React, { useEffect, useState } from "react";

interface ProductFiltersProps {
  onSearch: (searchTerm: string) => void;
  onFilter: (category: string) => void;
  onSort: (sortOrder: string) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  onSearch,
  onFilter,
  onSort,
}) => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryList: string[] = await getAllCategories();
        setCategories(categoryList);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
      <input
        type="text"
        placeholder="Search products..."
        className="border p-2 rounded-md w-full md:w-1/3"
        onChange={(e) => onSearch(e.target.value)}
      />

      <select
        className="border p-2 rounded-md w-full md:w-1/4"
        onChange={(e) => onFilter(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>

      <select
        className="border p-2 rounded-md w-full md:w-1/4"
        onChange={(e) => onSort(e.target.value)}
      >
        <option value="">Sort By</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A-Z</option>
        <option value="name-desc">Name: Z-A</option>
      </select>
    </div>
  );
};

export default ProductFilters;
