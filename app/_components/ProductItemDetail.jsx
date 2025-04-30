"use client";
import React, { useContext, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { LoaderCircle, ShoppingBasket } from 'lucide-react';
import { useRouter } from 'next/navigation';
import GlobalApi from '../_utils/GlobalApi';
import { toast } from 'sonner';
import { UpdateCartContext } from '../_context/UpdateCartContext';

function ProductItemDetail({ product }) {
  const jwt = sessionStorage.getItem('jwt');
  const {updateCart,setUpdateCart}=useContext(UpdateCartContext)
  const user = JSON.parse(sessionStorage.getItem('user'));
  const imageUrl = `http://localhost:1337${product?.images?.[0]?.url}`;
  const [productTotalPrice, setProductTotalPrice] = useState(
    product.sellingPrice ? product.sellingPrice : product.mrp
  );
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [loading,setLoading]=useState(false);

  const addToCart = () => {
    setLoading(true)
    if (!jwt) {
      router.push('/sign-in');
      setLoading(false)
      return;
    }
    const data = {
      data: {
        quantity: quantity,
        amount: (quantity * productTotalPrice).toFixed(2),
        products: product.id-1, // Ensure product ID exists in the database
        users_permissions_users:user.id,
        userid:user.id
      }
    };
    
    console.log("Sending Data to Strapi:", data);

    GlobalApi.addToCart(data, jwt)
      .then((resp) => {
        console.log("Strapi Response:", resp);
        toast("Added to Cart");
        setUpdateCart(!updateCart)
        setLoading(false)
      })
      .catch((e) => {
        console.error("Error:", e);
        toast("Error While Adding to Cart");
        setLoading(false)
      });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black">
      <Image
        src={imageUrl}
        alt="image"
        width={300}
        height={300}
        className="bg-slate-200 p-5 h-[320px] w-[300px] object-contain rounded-lg"
      />
      <div className="flex flex-col gap-3">
        <div className="text-2xl font-bold">{product?.name}</div>
        <div className="text-gray-600">{product?.description}</div>

        <div className="mt-2">
          <div className="text-gray-600 text-xl">
            <del>₹{product?.mrp}</del>
          </div>
          <div className="text-2xl font-semibold">₹{product?.sellingPrice}</div>
          <div className="text-gray-800">
            Quantity: <span className="text-red-400">{product?.itemQuantityType}</span>
          </div>
        </div>

        {/* Quantity Selector and Total Price */}
        <div className="flex items-center gap-3">
          {/* Quantity Selector */}
          <div className="p-3 border border-gray-200 flex gap-5 items-center w-[140px] rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center w-full justify-between">
              <button
                disabled={quantity == 1}
                onClick={() => setQuantity(quantity - 1)}
                className="text-2xl px-3 text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                -
              </button>
              <div className="mx-2 text-xl font-semibold text-gray-800">{quantity}</div>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-2xl px-3 text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                +
              </button>
            </div>
          </div>

          {/* Total Price */}
          <h2 className="text-xl font-bold">
            = ₹{(quantity * productTotalPrice).toFixed(2)}
          </h2>
        </div>

        {/* Add to Cart Button */}
        <div className="flex gap-3 w-[140px]">
          <Button className="w-full" onClick={() => addToCart()}
            disabled={loading}
            >

            <ShoppingBasket className="mr-2" />
            {loading?<LoaderCircle className='animate-spin'/>:'Add To Cart'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductItemDetail;
