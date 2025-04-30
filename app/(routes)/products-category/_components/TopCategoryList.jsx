
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

function TopCategoryList({categoryList}) {
  return (
    <div className="flex gap-5 mt-2 overflow-auto mx-7 md:justify-center">
    {categoryList.length > 0 ? (
      categoryList.map((category, index) => {
        const categoryName = category?.name || `Category ${index + 1}`;
        const categoryIcon =
          category?.icon?.[0]?.url || ""; // Access the URL of the first icon in the array
        console.log(`Category ${index + 1}:`, category);
        console.log(`Category ${index + 1} Icon URL:`, categoryIcon); 

        return (
          <Link href={'/products-category/'+categoryName} key={category?.id || index} className="flex flex-col items-center
           bg-green-50 gap-1 p-3 rounded-lg group cursor-pointer hover:bg-green-200 w-[150px] min-w-[100px]">
            
            {categoryIcon ? (
              <Image
                src={`http://localhost:1337${categoryIcon}`}
                width={50}
                height={50}
                alt={categoryName}
                className="group-hover:scale-125 transition-all ease-in-out"
              />
            ) : (
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-white">No Icon</span>
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
  )
}

export default TopCategoryList
