import { useContext } from "react";
import Sidebar from "../components/Layout/Sidebar";
import Navbar from "../components/Layout/Navbar";
import { AuthContext } from "../context/AuthContext";
import { User, Mail, Calendar, Shield, Sprout, Leaf, Award } from "lucide-react";

export default function Profile() {
    const { user } = useContext(AuthContext);

    return (
        <div className="min-h-screen bg-[#f0fdf4] dark:bg-gray-900 transition-colors duration-300">
            <Sidebar />
            <div className="lg:ml-64 flex flex-col min-h-screen">
                <Navbar />

                <main className="flex-1 p-6 lg:p-8 mt-28">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-green-900 dark:text-white tracking-tight">
                                User <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Profile</span>
                            </h1>
                            <p className="text-green-600 dark:text-gray-400 mt-1">Manage your account and view your plant care journey.</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Profile Card */}
                            <div className="lg:col-span-1">
                                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-green-100 dark:border-gray-700 flex flex-col items-center text-center">
                                    <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/30">
                                        <span className="text-4xl font-bold text-white">{user ? user[0].toUpperCase() : "U"}</span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{user || "Guest User"}</h2>
                                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-semibold rounded-full mb-6">
                                        Premium Member
                                    </span>

                                    <div className="w-full space-y-4">
                                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                                            <div className="flex items-center space-x-3">
                                                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                                                    <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                                </div>
                                                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Account Status</span>
                                            </div>
                                            <span className="text-sm font-bold text-green-600">Active</span>
                                        </div>
                                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                                            <div className="flex items-center space-x-3">
                                                <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg">
                                                    <Calendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                                </div>
                                                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Joined</span>
                                            </div>
                                            <span className="text-sm font-bold text-gray-900 dark:text-white">Nov 2023</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Details & Stats */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Personal Info */}
                                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-green-100 dark:border-gray-700">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                        <User className="w-5 h-5 mr-2 text-green-600" />
                                        Personal Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Username</label>
                                            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white font-medium">
                                                {user || "Not logged in"}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                                            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white font-medium">
                                                {user ? `${user.toLowerCase()}@example.com` : "guest@example.com"}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</label>
                                            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white font-medium">
                                                New Delhi, India
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Experience Level</label>
                                            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white font-medium">
                                                Intermediate Gardener
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Achievements / Stats */}
                                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-green-100 dark:border-gray-700">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                        <Award className="w-5 h-5 mr-2 text-yellow-500" />
                                        Plant Care Stats
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-900/30 text-center">
                                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <Sprout className="w-5 h-5 text-green-600 dark:text-green-400" />
                                            </div>
                                            <h4 className="text-2xl font-bold text-gray-900 dark:text-white">12</h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase mt-1">Plants Monitored</p>
                                        </div>
                                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30 text-center">
                                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <Leaf className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <h4 className="text-2xl font-bold text-gray-900 dark:text-white">98%</h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase mt-1">Health Score</p>
                                        </div>
                                        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-900/30 text-center">
                                            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                            </div>
                                            <h4 className="text-2xl font-bold text-gray-900 dark:text-white">5</h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase mt-1">Badges Earned</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
