import React, { useEffect, useState } from "react";
import Image from "next/image";
import { TrashIcon } from "lucide-react";

function CartItemList({ cartItemList, onDeleteItem }) {


  return (
    <div className="flex flex-col h-[calc(100vh-100px)]">
      {/* Scrollable Cart Items */}
      <div className="flex-grow overflow-y-auto p-4 space-y-3 custom-scroll">
        {cartItemList.map((cart, index) => (
          <div key={index} className="flex justify-between items-center p-3 border rounded-lg shadow-sm bg-white">
            <div className="flex gap-4 items-center">
              <Image 
                src={cart.image} 
                width={70} 
                height={70} 
                alt={cart.name} 
                className="border p-2 rounded-md"
              />
              <div>
                <h2 className="font-semibold text-gray-800">{cart.name}</h2>
                <h2 className="text-sm text-gray-500">Quantity: {cart.quantity}</h2>
                <h2 className="text-lg font-bold text-green-600">₹ {cart.amount}</h2>
              </div>
            </div>
            
            <TrashIcon 
              onClick={() => onDeleteItem(cart.id)}
              size={22}  
              className="text-red-500 cursor-pointer hover:text-red-700 transition-all duration-200 flex-shrink-0"
            />
          </div>
        ))}
      </div>


    </div>
  );
}

export default CartItemList;
