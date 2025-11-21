import { useState } from "react";
import axios from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { Leaf, User, Lock, UserPlus, Sparkles } from "lucide-react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/auth/signup", { username, password });
      alert("Account created");
      navigate("/");
    } catch (err) {
      alert("User already exists");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f0fdf4] p-4">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Register Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-green-100 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white p-4 rounded-full shadow-lg relative">
                <Leaf className="w-12 h-12 text-emerald-600" />
                <div className="absolute -top-1 -right-1">
                  <Sparkles className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                </div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Smart Plant Monitoring System</h2>
            <p className="text-emerald-100 text-sm">Join us and start caring for your plants</p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2 text-center">Create Account</h3>
            <p className="text-gray-500 text-sm text-center mb-6">Start your plant care journey today</p>

            {/* Username Input */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Choose a username"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  placeholder="Create a strong password"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Use at least 6 characters for better security</p>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 rounded-lg hover:from-emerald-700 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 flex items-center justify-center space-x-2 font-semibold"
            >
              <UserPlus className="w-5 h-5" />
              <span>Create Account</span>
            </button>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <Link
                  className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline transition-colors"
                  to="/"
                >
                  Login Here
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Footer Text */}
        <p className="text-center mt-6 text-green-800 text-sm font-medium">
          🌿 Welcome to the plant care community
        </p>
      </div>
    </div>
  );
}