import React from "react";

const MyOrder = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold text-green-700 mb-6">My Orders</h1>

      {/* Order List */}
      <div className="space-y-4">
        {/* Single Order Card */}
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold">Order #123456</p>
              <p className="text-gray-600 text-sm">Placed on: Feb 20, 2025</p>
            </div>
            <span className="bg-green-100 text-green-700 px-3 py-1 text-sm rounded-full">
              Delivered
            </span>
          </div>
          <div className="mt-2 text-gray-700 text-sm">
            <p>Items: 3</p>
            <p>Total: ₹ 1,299</p>
          </div>
        </div>

        {/* Another Order Card */}
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold">Order #123457</p>
              <p className="text-gray-600 text-sm">Placed on: Feb 18, 2025</p>
            </div>
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 text-sm rounded-full">
              Pending
            </span>
          </div>
          <div className="mt-2 text-gray-700 text-sm">
            <p>Items: 5</p>
            <p>Total: ₹ 2,799</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
