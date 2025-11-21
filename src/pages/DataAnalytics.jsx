import { useState, useEffect } from "react";
import Sidebar from "../components/Layout/Sidebar";
import Navbar from "../components/Layout/Navbar";
import AIChatbot from "../components/AIChatbot";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { Activity, Droplets, Thermometer, WifiOff } from "lucide-react";

export default function DataAnalytics() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const history = JSON.parse(localStorage.getItem('sensorHistory') || '[]');
        setData(history);
    }, []);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                    <p className="text-sm font-bold text-gray-900 dark:text-white mb-2">{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
                            {entry.name}: {entry.value}
                            {entry.name === 'Temperature' ? '°C' : '%'}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-[#f0fdf4] dark:bg-gray-900 transition-colors duration-300">
            <Sidebar />
            <div className="lg:ml-64 flex flex-col min-h-screen">
                <Navbar />

                <main className="flex-1 p-6 lg:p-8 mt-28">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="mb-10">
                            <h1 className="text-3xl font-bold text-green-900 dark:text-white tracking-tight mb-2">
                                Data <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Analytics</span>
                            </h1>
                            <p className="text-green-600 dark:text-gray-400">
                                Visualize your plant's health trends over time.
                            </p>
                        </div>

                        {/* Charts Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                            {/* Temperature Chart */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-green-100 dark:border-gray-700">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-orange-100 dark:bg-orange-500/20 p-2.5 rounded-xl">
                                            <Thermometer className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                        </div>
                                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Temperature Trends</h2>
                                    </div>
                                    <div className="text-xs font-medium text-green-600 bg-green-50 dark:bg-gray-700 dark:text-gray-300 px-3 py-1 rounded-full">
                                        Last 20 Readings
                                    </div>
                                </div>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
                                                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" className="dark:stroke-gray-700" />
                                            <XAxis
                                                dataKey="time"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                                dy={10}
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                            />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Area
                                                type="monotone"
                                                dataKey="temp"
                                                name="Temperature"
                                                stroke="#f97316"
                                                strokeWidth={3}
                                                fillOpacity={1}
                                                fill="url(#colorTemp)"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Moisture Chart */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-green-100 dark:border-gray-700">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-blue-100 dark:bg-blue-500/20 p-2.5 rounded-xl">
                                            <Droplets className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Soil Moisture Trends</h2>
                                    </div>
                                    <div className="text-xs font-medium text-green-600 bg-green-50 dark:bg-gray-700 dark:text-gray-300 px-3 py-1 rounded-full">
                                        Last 20 Readings
                                    </div>
                                </div>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" className="dark:stroke-gray-700" />
                                            <XAxis
                                                dataKey="time"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                                dy={10}
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                            />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Area
                                                type="monotone"
                                                dataKey="moisture"
                                                name="Moisture"
                                                stroke="#3b82f6"
                                                strokeWidth={3}
                                                fillOpacity={1}
                                                fill="url(#colorMoisture)"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* Nutrient Levels Placeholder */}
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-green-100 dark:border-gray-700 overflow-hidden">
                            <div className="p-6 border-b border-green-100 dark:border-gray-700 flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-green-100 dark:bg-green-500/20 p-2.5 rounded-xl">
                                        <Activity className="w-5 h-5 text-green-600 dark:text-green-400" />
                                    </div>
                                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Nutrient Levels (NPK)</h2>
                                </div>
                                <div className="flex items-center space-x-2 text-orange-500 bg-orange-50 dark:bg-orange-900/20 px-3 py-1.5 rounded-lg">
                                    <WifiOff className="w-4 h-4" />
                                    <span className="text-xs font-bold uppercase tracking-wide">Disconnected</span>
                                </div>
                            </div>

                            <div className="p-12 flex flex-col items-center justify-center text-center">
                                <div className="bg-green-50 dark:bg-gray-900 p-6 rounded-full mb-4 animate-pulse">
                                    <WifiOff className="w-10 h-10 text-green-400 dark:text-gray-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Hardware Connection Required</h3>
                                <p className="text-green-600 dark:text-gray-400 max-w-md">
                                    Please connect your SmartPlant hardware device to view real-time Nitrogen, Phosphorus, and Potassium levels.
                                </p>
                                <button className="mt-6 px-6 py-2.5 bg-[#006d32] hover:bg-green-800 text-white font-bold rounded-xl hover:scale-105 transition-transform shadow-lg">
                                    Connect Device
                                </button>
                            </div>
                        </div>
                    </div>
                    <AIChatbot />
                </main>
            </div>
        </div>
    );
}
