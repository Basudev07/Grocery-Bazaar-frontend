"use client";
import GlobalApi from '@/app/_utils/GlobalApi';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { LoaderIcon } from 'lucide-react';

function SignIn() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();
  const [loader,setLoader]=useState();

  useEffect(() => {
    const jwt = sessionStorage.getItem('jwt');
    if (jwt) {
      router.push('/');
    }
  }, []);

  const onSignIn = async () => {
    try {
      setLoader(true)
      const resp = await GlobalApi.SignIn(email, password);

      sessionStorage.setItem('user', JSON.stringify(resp.data.user));
      sessionStorage.setItem('jwt', resp.data.jwt);

      window.dispatchEvent(new Event('userLoggedIn')); // ✅ Notify other components

      toast.success("Login Successful");
      router.push('/');
      setLoader(false)
    } catch (e) {
      toast.error(e?.response?.data?.error?.message);
      setLoader(false)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-[400px] p-7 rounded-lg bg-white shadow-lg">
        {/* Logo */}
        <div className="text-center mb-6">
          <span className="text-3xl font-extrabold text-green-600">
            Grocery Bazar
          </span>
        </div>

        {/* Title and Subtitle */}
        <h2 className="font-bold text-center text-xl">Sign In</h2>
        <h2 className="text-gray-600 text-center text-md mb-6">
          Enter your Email and Password to Sign In
        </h2>

        {/* Form Inputs */}
        <div className="w-full flex flex-col gap-4">
          <Input
            className="w-full"
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            className="w-full"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            onClick={onSignIn}
            className="w-full"
            disabled={!(email && password)}
          >
          {loader?<LoaderIcon className='animate-spin'/>:'Sign In'}
          </Button>

          <p className="mt-4 text-sm text-gray-500 text-center">
            Don't have an account?
            <Link href={'/create-account'} className="text-blue-500 cursor-pointer hover:underline ml-1">
              Click here to create a new account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
