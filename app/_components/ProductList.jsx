"use client"
import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import GlobalApi from "../_utils/GlobalApi";

function ProductList({ productList: initialProductList }) {
  const [productList, setProductList] = useState(initialProductList || []); // Default to empty array
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!initialProductList || initialProductList.length === 0) {
      getProducts();  // Fetch all products if the productList prop is empty or undefined
    } else {
      setProductList(initialProductList);  // Use the products passed as props
    }
  }, [initialProductList]);

  const getProducts = async () => {
    try {
      // Fetch data
      const resp = await GlobalApi.getAllProducts();
      console.log("Full API Response:", resp);

      // Response is now directly an array, just use resp
      const products = resp;
      console.log("Extracted Product Data:", products);

      // If data is empty, log a message
      if (products.length === 0) {
        console.log("No products found in the response.");
      }

      setProductList(products); // Set the product list
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Error fetching products");
    }
  };

  // Safety check for undefined or empty productList
  const hasProducts = productList && productList.length > 0;

  return (
    <div className="mt-10">
      <h2 className="text-green-700 font-bold text-2xl">Our Popular Products</h2>
      {error && <div className="text-red-500">{error}</div>}
      
     <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">

        {hasProducts ? (
          productList.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))
        ) : (
          <div className="text-center text-gray-500 col-span-full">No Products Available</div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
