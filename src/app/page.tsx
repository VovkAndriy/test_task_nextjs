import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Test Task</h1>
        <h2 className="text-lg text-gray-600">
          To see demonstration of technical skills using Next.js
        </h2>
        <Link
          href="/products"
          className="mt-4 inline-block px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
        >
          Click here
        </Link>
      </div>
    </div>
  );
}
