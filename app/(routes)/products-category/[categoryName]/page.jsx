"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion"; // Import Framer Motion
import GlobalApi from "@/app/_utils/GlobalApi";
import TopCategoryList from "../_components/TopCategoryList";
import ProductList from "@/app/_components/ProductList";

function ProductCategory() {
  const { categoryName } = useParams();
  const decodedCategoryName = decodeURIComponent(decodeURIComponent(categoryName));
  const safeCategoryName = decodedCategoryName.replace("&", "%26");

  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const [products, categories] = await Promise.all([
          GlobalApi.getProductsByCategory(safeCategoryName),
          GlobalApi.getCategoryList(),
        ]);

        setProductList(products);
        setCategoryList(categories);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [safeCategoryName]);

  return (
    <div className="min-h-screen flex flex-col">
      <h2 className="p-4 bg-primary text-white font-bold text-3xl text-center">
        {decodedCategoryName}
      </h2>

      {/*Loading Animation */}
      {loading ? (
        <div className="flex flex-grow justify-center items-center">
          <motion.div
            className="w-16 h-16 border-8 border-primary border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
          />
        </div>
      ) : (
        <>
          <TopCategoryList categoryList={categoryList} />
          <div className="p-5 md:p-10">
            <ProductList productList={productList} />
          </div>
        </>
      )}
    </div>
  );
}

export default ProductCategory;
