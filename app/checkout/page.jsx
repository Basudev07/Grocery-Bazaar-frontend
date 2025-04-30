'use client'
import React, { useEffect, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import { useRouter } from "next/navigation";
import { PayPalButtons } from "@paypal/react-paypal-js";

function Checkout() {
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [cartItemList, setCartItemList] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [gstAmount, setGstAmount] = useState(0);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [zip, setZip] = useState('');
  const [address, setAddress] = useState('');
  const [userId, setUserId] = useState(null);

  const router = useRouter();
  const user = typeof window !== "undefined" ? JSON.parse(sessionStorage.getItem("user")) : null;
  const jwt = typeof window !== "undefined" ? sessionStorage.getItem("jwt") : null;

  useEffect(() => {
    if (!jwt) {
      router.push('/sign-in');
    } else {
      fetchUserProfile();
      getCartItems();
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const profile = await GlobalApi.getUserProfile(jwt);
      setUserId(profile.id);
      setUsername(profile.username || '');
      setEmail(profile.email || '');
      setPhone(profile.phoneNumber || '');
      setZip(profile.zip || '');
      setAddress(profile.address || '');
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  const getCartItems = async () => {
    if (!user || !user.id) {
      setTotalCartItem(0);
      setCartItemList([]);
      return;
    }

    try {
      const cartItemList_ = await GlobalApi.getCartItems(user.id, jwt);
      setTotalCartItem(cartItemList_?.length || 0);
      setCartItemList(cartItemList_ || []);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    let total = cartItemList.reduce((sum, item) => sum + item.amount, 0);
    setSubtotal(total);
  }, [cartItemList]);

  useEffect(() => {
    setGstAmount(subtotal * 0.18);
  }, [subtotal]);

  const INR_TO_USD = 86.93;
  const calculateTotalAmountINR = () => (subtotal + gstAmount + 40).toFixed(2);
  const calculateTotalAmountUSD = () => (calculateTotalAmountINR() / INR_TO_USD).toFixed(2);

  return (
    <div className="min-h-screen w-screen bg-gray-100 flex items-center justify-center overflow-y-auto overflow-x-hidden relative p-4 md:p-0 pt-7">
      <div className="w-full max-w-4xl bg-white p-4 md:p-8 rounded-lg shadow-md overflow-auto max-h-screen">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">Checkout</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Billing Details */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Billing Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input value={username} onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Name"
                className="border p-2 rounded w-full focus:ring-2 focus:ring-green-600"
              />
              <input value={email} onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                className="border p-2 rounded w-full focus:ring-2 focus:ring-green-600"
              />
              <input value={phone} onChange={(e) => setPhone(e.target.value)}
                type="text"
                placeholder="Phone"
                className="border p-2 rounded w-full focus:ring-2 focus:ring-green-600"
              />
              <input value={zip} onChange={(e) => setZip(e.target.value)}
                type="text"
                placeholder="Zip"
                className="border p-2 rounded w-full focus:ring-2 focus:ring-green-600"
              />
            </div>
            <textarea value={address} onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              className="border p-2 rounded w-full mt-4 h-24 focus:ring-2 focus:ring-green-600"
            ></textarea>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Total Cart ({totalCartItem})</h3>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal :</span>
                <span className="font-semibold">₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery :</span>
                <span className="font-semibold">₹40.00</span>
              </div>

              <div className="flex justify-between">
                <span>Tax (18%) :</span>
                <span className="font-semibold">₹{gstAmount.toFixed(2)}</span>
              </div>

              <hr className="my-2" />
              <div className="flex flex-col">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total :</span>
                  <span className="text-green-600">₹{calculateTotalAmountINR()}</span>
                </div>
                <div className="text-right text-sm text-gray-500">
                  (${calculateTotalAmountUSD()} USD)
                </div>
              </div>
            </div>

            <div className="mt-4">
              <PayPalButtons
                style={{ layout: "horizontal" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: calculateTotalAmountUSD().toString(),
                          currency_code: "USD",
                        },
                      },
                    ],
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
