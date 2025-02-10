"use client";

import { getProductById } from "@/app/lib/api";
import Image from "next/image";
import React, { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";

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

const ProductPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const unwrappedParams = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(Number(unwrappedParams.id));
      setProduct(data);
    };
    fetchProduct();
  }, [unwrappedParams.id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => router.back()}
        className="bg-gray-500 text-white px-4 py-2 rounded mb-4"
      >
        ← Go Back
      </button>

      <h1 className="text-3xl font-bold">{product.title}</h1>
      <Image
        src={product.image}
        alt={product.title}
        width={400}
        height={400}
        className="w-64 mx-auto my-4"
      />
      <p className="text-lg text-gray-700">{product.description}</p>
      <p className="text-xl font-semibold mt-4">Price: ${product.price}</p>
      <p className="text-sm text-gray-500">Category: {product.category}</p>
      <p className="text-sm text-gray-500">
        Rating: {product.rating.rate} ({product.rating.count} reviews)
      </p>
    </div>
  );
};

export default ProductPage;
