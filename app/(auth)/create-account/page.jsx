"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import GlobalApi from '@/app/_utils/GlobalApi';
import { toast } from 'sonner'; // ✅ Corrected import
import { LoaderIcon } from 'lucide-react';
import { Eye, EyeOff } from 'lucide-react'; // Import minimal Eye and EyeOff icons
import { FaGoogle, FaFacebook } from 'react-icons/fa'; // Use Google and Facebook icons from react-icons

function CreateAccount() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const router = useRouter();
  const [loader, setLoader] = useState();

  useEffect(() => {
    const jwt = sessionStorage.getItem('jwt');
    if (jwt) {
      router.push('/');
    }
  }, []);

  const onCreateAccount = () => {
    setLoader(true);
    GlobalApi.registerUser(username, email, password)
      .then(resp => {
        console.log(resp);
        console.log(resp.data.user);
        console.log(resp.data.jwt);

        // ✅ Corrected sessionStorage usage
        sessionStorage.setItem('user', JSON.stringify(resp.data.user));
        sessionStorage.setItem('jwt', resp.data.jwt);

        // ✅ Use toast instead of Toaster
        toast.success("Account Created Successfully");

        router.push('/');
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
        toast.error(err?.response?.data?.error?.message);
      });
  };

  // Function to handle Google login
  const handleGoogleLogin = () => {
    toast.info('Google Login functionality coming soon!');
    // You would integrate with Google OAuth API here
  };

  // Function to handle Facebook login
  const handleFacebookLogin = () => {
    toast.info('Facebook Login functionality coming soon!');
    // You would integrate with Facebook OAuth API here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-[400px] p-7 rounded-lg bg-white shadow-lg">
        {/* Logo */}
        <div className="text-center">
          <span className="text-3xl font-extrabold text-green-600">
            Grocery Bazar
          </span>
        </div>
        
        {/* Title and Subtitle */}
        <h2 className="font-bold text-center text-xl mb-4">Create an Account</h2>
        <h2 className="text-gray-600 text-center text-md mb-6">
          Enter your Username and Password to Create an Account
        </h2>

        {/* Form Inputs */}
        <div className="w-full flex flex-col gap-4 items-center">
          <Input 
            className="w-full" 
            placeholder="Username" 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <Input 
            className="w-full" 
            placeholder="name@example.com" 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <div className="relative w-full">
            <Input 
              className="w-full" 
              placeholder="Password" 
              type={showPassword ? 'text' : 'password'} // Toggle password visibility
              onChange={(e) => setPassword(e.target.value)} 
            />
            <div 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />} {/* Minimal eye icon */}
            </div>
          </div>
          <Input 
            className="w-full" 
            placeholder="Confirm Password" 
            type="password" 
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />

          <Button 
            onClick={onCreateAccount} 
            className="w-full"
            disabled={!(username && email && password && password === confirmPassword)} // Ensure password match
          >
            {loader ? <LoaderIcon className='animate-spin' /> : 'Create An Account'}
          </Button>
          
          {/* Social Login Buttons */}
          <div className="flex w-full gap-2 mb-4">
            <Button 
              className="w-1/2 bg-red-600 hover:bg-red-700 text-white text-sm flex items-center justify-center" 
              onClick={handleGoogleLogin}
            >
              <FaGoogle size={18} className="mr-2" /> Google
            </Button>
            <Button 
              className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white text-sm flex items-center justify-center" 
              onClick={handleFacebookLogin}
            >
              <FaFacebook size={18} className="mr-2" /> Facebook
            </Button>
          </div>

          <p className="text-sm text-gray-500">
            Already Have an Account?  
            <Link href={'/sign-in'} className="text-blue-500 cursor-pointer hover:underline">
              Click here to Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
