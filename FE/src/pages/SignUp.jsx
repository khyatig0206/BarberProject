import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import Header from "../components/Header";
const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); 
  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/signup`, data);
      alert("Sign Up Successful! Please check your email for the verification code.");
      navigate("/verify", { state: { username: data.username } }); // Redirect to Verify page with username
    } catch (err) {
      setError(err.response?.data?.message || "Sign Up Failed");
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="flex justify-center items-center min-h-screen bg-cream">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-coffee mb-6">Sign Up</h1>
        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              placeholder="Enter Username"
              {...register("username", { required: "Username is required" })}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring focus:ring-coffee focus:outline-none"
            />
            {errors.username && <p className="text-sm text-red-600">{errors.username.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring focus:ring-coffee focus:outline-none"
            />
            {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring focus:ring-coffee focus:outline-none"
            />
            {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword", { required: "Confirm Password is required" })}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring focus:ring-coffee focus:outline-none"
            />
            {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <div className="flex gap-4">
              <label>
                <input
                  type="radio"
                  value="admin"
                  {...register("role", { required: "Role is required" })}
                />
                Admin
              </label>
              <label>
                <input
                  type="radio"
                  value="customer"
                  {...register("role", { required: "Role is required" })}
                />
                Customer
              </label>
            </div>
            {errors.role && <p className="text-sm text-red-600">{errors.role.message}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brown text-white py-2 rounded-lg hover:bg-coffee transition disabled:opacity-50"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account? <a href="/signin" className="text-coffee font-semibold">Sign In</a>
        </p>
      </div>
    </div>

  );
};

export default SignUp;
