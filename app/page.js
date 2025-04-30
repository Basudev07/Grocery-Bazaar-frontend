"use client";
import React, { useState, useEffect } from "react";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import CategoryList from "./_components/CategoryList";
import ProductList from "./_components/ProductList";
import Image from "next/image";
import Footer from "./_components/Footer";

// Skeleton Loader
const SkeletonLoader = ({ width, height, className = "" }) => (
  <div className={`bg-gray-300 animate-pulse rounded-lg ${className}`} style={{ width, height }}></div>
);

export default function Home() {
  const [sliderList, setSliderList] = useState([]); 
  const [categoryList, setCategoryList] = useState([]); 
  const [productList, setProductList] = useState([]); 
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingOtherData, setLoadingOtherData] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    GlobalApi.getCategoryList()
      .then((categories) => {
        if (isMounted) setCategoryList(categories);
      })
      .catch((error) => console.error("Error fetching categories:", error))
      .finally(() => setLoadingCategories(false));

    return () => {
      isMounted = false; // Prevent memory leak
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      GlobalApi.getSliders(),
      GlobalApi.getAllProducts(),
    ])
      .then(([sliders, products]) => {
        if (isMounted) {
          setSliderList(sliders);
          setProductList(products);
        }
      })
      .catch((error) => console.error("Error fetching other data:", error))
      .finally(() => setLoadingOtherData(false));

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="p-5 md:p-10 px-4 sm:px-8 md:px-12 overflow-x-hidden">
      {/* Slider */}
      {loadingOtherData ? <SkeletonLoader width="100%" height="250px" className="mb-5" /> : <Slider sliderList={sliderList} />}

      <CategoryList categoryList={categoryList} />

      {/* Product List */}
      {loadingOtherData ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {Array(8).fill(0).map((_, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <SkeletonLoader width="100%" height="200px" />
              <SkeletonLoader width="80%" height="20px" className="mt-3" />
              <SkeletonLoader width="60%" height="15px" className="mt-2" />
            </div>
          ))}
        </div>
      ) : (
        <ProductList productList={productList} />
      )}

      {/* Banner */}
      <Image
        src="/banner.png"
        alt="banner"
        width={1000}
        height={300}
        className="w-full h-auto object-cover"
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
