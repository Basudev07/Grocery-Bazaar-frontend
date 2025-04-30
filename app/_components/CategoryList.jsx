"use client";

import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import GlobalApi from "../_utils/GlobalApi";

function CategoryList() {
  const [categoryList, setCategoryList] = useState([]);

  // Fetch category list from API
  const fetchCategories = useCallback(async () => {
    try {
      const resp = await GlobalApi.getCategory();
      setCategoryList(resp?.data?.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className="mt-5">
      <h2 className="text-green-700 font-bold text-2xl">Shop by Category</h2>

      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-5 mt-2">
        {categoryList.length > 0 ? (
          categoryList.map((category) => {
            const categoryName = category?.name || "Unknown Category";
            const categoryIcon = category?.icon?.[0]?.url || "";

            return (
              <Link
                href={`/products-category/${encodeURIComponent(categoryName)}`}
                key={category?.id}
                className="flex flex-col items-center bg-green-50 gap-1 p-3 rounded-lg group cursor-pointer hover:bg-green-200"
              >
                {categoryIcon ? (
                  <Image
                    src={`http://localhost:1337${categoryIcon}`}
                    width={50}
                    height={50}
                    alt={categoryName}
                    priority // Optimized for faster loading
                    className="group-hover:scale-125 transition-all ease-in-out"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">No Icon</span>
                  </div>
                )}
                <h3 className="mt-2 text-green-800 text-center">{categoryName}</h3>
              </Link>
            );
          })
        ) : (
          <div className="text-center text-gray-500">No Categories Available</div>
        )}
      </div>
    </div>
  );
}

export default CategoryList;
