"use client";
import React, { useState, useEffect } from "react";
import { Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import GlobalApi from "../_utils/GlobalApi";
import { toast } from "sonner";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("jwt");
    if (!storedToken) {
      toast.warning("Session expired. Redirecting to login...");
      router.push("/login");
      return;
    }
    setToken(storedToken);
  }, [router]);

  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const userData = await GlobalApi.getUserProfile(token);
        console.log("Fetched userData:", userData);

        setUser({
          id: userData.id,
          fullName: userData.username || "",
          email: userData.email || "",
          phoneNumber: userData.phoneNumber || "",
          address: userData.address || "",
          zipcode: userData.zip || "",
          profile: userData.profile || null,
        });
      } catch (err) {
        toast.error("Failed to load profile. Please log in again.");
        sessionStorage.removeItem("jwt");
        setTimeout(() => router.push("/login"), 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token || !user?.id) {
      toast.error("Session expired. Please log in again.");
      router.push("/login");
      return;
    }

    try {
      const payload = {
        username: user.fullName,
        phoneNumber: user.phoneNumber,
        address: user.address,
        zip: user.zipcode,
        profile: user.profile?.id || null,
      };

      await GlobalApi.updateUserProfile(user.id, payload, token);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Update failed. Please try again.");
      console.error("Profile update error:", error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("files", file);
    setIsUploading(true);

    try {
      const res = await fetch("http://localhost:1337/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const uploadData = await res.json();
      const uploadedImage = uploadData[0];

      if (uploadedImage?.id) {
        const payload = {
          profile: uploadedImage.id,
        };

        await GlobalApi.updateUserProfile(user.id, payload, token);

        // Optional: refetch profile or just update profile in state
        setUser((prev) => ({
          ...prev,
          profile: uploadedImage,
        }));

        toast.success("Profile picture updated!");
      }
    } catch (err) {
      console.error("Image upload failed:", err);
      toast.error("Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading profile...</div>;
  }

  if (!user) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">No user data available</p>
        <button
          onClick={() => router.push("/login")}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold text-green-700 mb-6">My Profile</h1>

      <div className="flex items-center space-x-4">
        <div className="relative w-24 h-24">
          <img
            src={
              user.profile?.url
                ? `http://localhost:1337${user.profile.url}`
                : "/user.png"
            }
            alt="Profile"
            className={`w-24 h-24 rounded-full border-4 border-green-500 object-cover transition-opacity duration-300 ${
              isUploading ? "opacity-50" : "opacity-100"
            }`}
          />
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 border-4 border-white border-t-green-500 rounded-full animate-spin" />
            </div>
          )}
          <label className="absolute bottom-1 right-1 bg-green-500 p-2 rounded-full text-white cursor-pointer">
            <Camera className="w-4 h-4" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
        <div>
          <p className="text-lg font-semibold">{user.fullName}</p>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={user.fullName}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:border-green-500 focus:ring-green-500"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            disabled
            className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:border-green-500 focus:ring-green-500"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Zip Code</label>
          <input
            name="zipcode"
            value={user.zipcode}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:border-green-500 focus:ring-green-500"
            placeholder="Enter your zip code"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            name="address"
            value={user.address}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:border-green-500 focus:ring-green-500"
            placeholder="Enter your address"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;
