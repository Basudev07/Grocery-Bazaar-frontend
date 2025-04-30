import React from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductItemDetail from './ProductItemDetail';

function ProductItem({ product }) {
  // Ensure image URL is correct
  const imageUrl = `http://localhost:1337${product?.images?.[0]?.url}`;

  return (
    <div className="bg-green-50 p-4 rounded-lg group cursor-pointer hover:scale-105 hover:shadow-md transition-all ease-in-out flex flex-col">
      {/* Image Section */}
      <div className="flex justify-center items-center w-full">
        {imageUrl ? (
          <Image
            src={imageUrl}
            width={200}
            height={200}
            alt={product?.name || 'Product Image'}
            className="w-full h-auto max-h-[200px] object-contain rounded-md"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-500 text-sm">No Image</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col mt-3 flex-grow">
        <h2 className="text-green-800 text-lg font-extrabold truncate">{product?.name}</h2>
        <div className="mt-2 space-y-1">
          <p className="text-gray-600 text-sm">
            <del>₹{product?.mrp}</del>
          </p>
          <p className="text-xl font-semibold text-gray-800">₹{product?.sellingPrice}</p>
          <p className="text-red-400 text-sm">{product?.itemQuantityType}</p>
        </div>
      </div>

      {/* Add To Cart Button */}
      <Dialog>
        <DialogTrigger asChild>
          <button className="mt-4 bg-transparent border-2 border-green-500 text-green-500 px-4 py-2 rounded-full text-sm font-medium hover:bg-green-500 hover:text-white transition-all duration-300 ease-in-out w-full">
            Add To Cart
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogDescription asChild>
              <div>
                <ProductItemDetail product={product} />
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProductItem;