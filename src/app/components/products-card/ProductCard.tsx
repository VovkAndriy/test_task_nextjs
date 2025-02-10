import Image from "next/image";
import Link from "next/link";
import React from "react";

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

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col items-center">
      <div className="w-full h-52 flex items-center justify-center">
        <Image
          src={product.image}
          alt={product.title}
          width={150}
          height={150}
          className="object-contain"
        />
      </div>
      <p className="mt-3 text-lg font-medium text-center text-gray-800">
        {product.title}
      </p>
      <p className="mt-2 text-gray-500 text-sm">${product.price}</p>
      <Link
        href={`/products/${product.id}`}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
      >
        More info
      </Link>
    </div>
  );
};

export default ProductCard;
