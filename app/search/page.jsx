"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // Import search params

import GlobalApi from "../_utils/GlobalApi";
import ProductItem from "../_components/ProductItem";

function ProductList({ productList: initialProductList }) {
  const searchParams = useSearchParams();
  const query = searchParams.get("q"); // Get search query from URL

  const [productList, setProductList] = useState(initialProductList || []);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchQuery =
      typeof query === "string" && query !== "[object Object]"
        ? query.trim()
        : "";

    console.log("Search Query:", searchQuery); // Debugging log

    if (!searchQuery) {
      if (!initialProductList || initialProductList.length === 0) {
        getProducts(); // Fetch all products when no search query
      } else {
        setProductList(initialProductList);
      }
    } else {
      searchProducts(searchQuery); // Fetch filtered products when searching
    }
  }, [query, initialProductList]);

  const getProducts = async () => {
    try {
      const resp = await GlobalApi.getAllProducts();
      setProductList(resp);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Error fetching products");
    }
  };

  const searchProducts = async (searchQuery) => {
    try {
      const resp = await GlobalApi.searchProducts(searchQuery); // Call your search API
      setProductList(resp);
    } catch (err) {
      console.error("Error searching products:", err);
      setError("Error searching products");
    }
  };

  return (
    <div className="mt-16 px-5 md:px-10 lg:px-20 mx-auto">
      <h2 className="text-green-700 font-bold text-2xl text-center">
        {query && query !== "[object Object]" && query !== "null" && query !== "undefined"
          ? `Search Results for "${query}"`
          : "Our Popular Products"}
      </h2>
      {error && <div className="text-red-500 text-center">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {productList.length > 0 ? (
          productList.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))
        ) : (
          <div className="text-center text-gray-500 col-span-full">
            No Products Found
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
