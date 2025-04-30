"use client";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from 'next/navigation';
import { LayoutGrid, Search, ShoppingBag, CircleUserRound, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GlobalApi from "../_utils/GlobalApi";
import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CartItemList from "./CartItemList";
import { UpdateCartContext } from "../_context/UpdateCartContext";
import { Button } from "@/components/ui/button";
import { debounce } from 'lodash';

function Header() {
  const [categoryList, setCategoryList] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [cartItemList, setCartItemList] = useState([]); 
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);  // <-- Added to manage cart Sheet state
  const router = useRouter();
  
  const user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null;
  const jwt = sessionStorage.getItem('jwt') || null;

  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);

  useEffect(() => {
    getCategoryList();
    setIsLogin(!!sessionStorage.getItem("jwt"));

    const handleLogin = () => setIsLogin(!!sessionStorage.getItem("jwt"));
    window.addEventListener("userLoggedIn", handleLogin);

    return () => {
      window.removeEventListener("userLoggedIn", handleLogin);
    };
  }, []);

  useEffect(() => {
    if (user) getCartItems();
  }, [updateCart, user]);

  const getCategoryList = () => {
    GlobalApi.getCategory()
      .then((resp) => setCategoryList(resp.data?.data || []))
      .catch((err) => console.error("Error fetching categories:", err));
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

  const onSignOut = () => {
    sessionStorage.clear();
    router.push('/sign-in');
  };

  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    let total = cartItemList.reduce((sum, item) => sum + item.amount, 0);
    setSubtotal(total);
  }, [cartItemList]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', checkMobile);
    checkMobile(); 
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const debouncedSearch = useCallback(
    debounce((query) => {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }, 300), 
    [router]
  );
  
  const navigateToSearchPage = (query) => {
    debouncedSearch(query);
  };


  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50 h-14 flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold text-green-600">
          {isMobile ? 'GZR' : 'Grocery Bazaar'}
        </Link>
        
        {!isMobile || !isSearchOpen ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <h2 className="flex gap-2 items-center border rounded-full p-1 px-3 bg-gray-100 cursor-pointer text-sm">
                <LayoutGrid className="h-5 w-5" /> Category
              </h2>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {categoryList.map((category, index) => (
                <DropdownMenuItem key={category?.id || index} className="flex items-center gap-3 cursor-pointer">
                  {category?.icon?.[0]?.url && (
                    <Image
                      src={`http://localhost:1337${category.icon[0].url}`}
                      width={20}
                      height={20}
                      alt={category?.name || `Category ${index + 1}`}
                      className="rounded-full"
                    />
                  )}
                  <h2 className="text-lg">{category?.name || `Category ${index + 1}`}</h2>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}

        {/* Search Bar */}
        <div 
          className={`flex items-center border rounded-full p-1 transition-all duration-300  
            ${isMobile ? (isSearchOpen ? 'w-full px-4' : 'w-12') : 'px-3'}
            ${isSearchOpen ? 'bg-gray-100' : 'cursor-pointer'}`}
          onClick={() => isMobile && setIsSearchOpen(true)}
        >
          <Search className="h-7 w-9" />
          {(!isMobile || isSearchOpen) && (
            <input 
              type="text" 
              placeholder="Search Products" 
              className="outline-none bg-transparent text-sm w-full ml-2" 
              value={searchQuery} 
              onChange={(e) => {
                setSearchQuery(e.target.value);
                navigateToSearchPage(e.target.value);
              }}
            />
          )}
          {isMobile && isSearchOpen && (
            <X className="h-5 w-5 ml-2 cursor-pointer" onClick={(e) => {
              e.stopPropagation();
              setIsSearchOpen(false);
            }} />
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className={`flex items-center gap-3 ${isMobile && isSearchOpen ? 'hidden' : 'flex'}`}>
        
         {/* Cart */}
         <Sheet>
              <SheetTrigger>
              <div className="flex items-center gap-1 cursor-pointer relative">
                  <ShoppingBag className="h-6 w-6" />
                  {totalCartItem > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalCartItem}
                    </span>
                  )}
                </div>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="bg-primary text-white font-bold text-lg p-2">My Cart</SheetTitle>
                  <CartItemList cartItemList={cartItemList} />
                </SheetHeader>
                <SheetClose asChild>
                  <div className="p-4 bg-white shadow-lg border-t w-full sticky bottom-0">
                    <div className="flex justify-between text-lg font-bold text-gray-800 mb-3">
                      <h2>Subtotal:</h2>
                      <span className="text-green-600">₹ {subtotal}</span>
                    </div>
                    <Button className="w-full py-3 text-lg bg-green-600 hover:bg-green-700" onClick={() => router.push(jwt ? "/checkout" : "/sign-in")}>
                      Check Out
                    </Button>
                  </div>
                </SheetClose>
              </SheetContent>
            </Sheet>

        {/* User */}
        <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {isLogin ? (
                  <CircleUserRound className="h-8 w-8 text-green-700 cursor-pointer hover:scale-110" />
                ) : (
                  <Link href="/sign-in">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-full text-sm">
                      Login
                    </button>
                  </Link>
                )}
              </DropdownMenuTrigger>
              {isLogin && (
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <Link href="/profile">
                    <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                  </Link>
                  <Link href="/myorder">
                    <DropdownMenuItem className="cursor-pointer">My Orders</DropdownMenuItem>
                  </Link>

                  <Link href="/dashboard">
                    <DropdownMenuItem className="cursor-pointer">Dashboard</DropdownMenuItem>
                  </Link>

                  <DropdownMenuItem onClick={onSignOut}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              )}
            </DropdownMenu>
      </div>
    </div>
  );
}

export default Header;
