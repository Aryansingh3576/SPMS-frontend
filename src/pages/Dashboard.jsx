import { useState, useEffect } from "react";
import Sidebar from "../components/Layout/Sidebar";
import Navbar from "../components/Layout/Navbar";
import AIChatbot from "../components/AIChatbot";
import { Activity, Droplets, Thermometer, AlertTriangle, CheckCircle, Moon, Sun, ArrowUpRight, MessageSquare, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Dashboard() {
    const { theme, toggleTheme } = useTheme();

    // State for manual inputs
    const [moisture, setMoisture] = useState("");
    const [temp, setTemp] = useState("");

    // State for calculated values
    const [health, setHealth] = useState(100);
    const [alerts, setAlerts] = useState([]);
    const [hasData, setHasData] = useState(false);

    const handleAnalyze = () => {
        if (moisture && temp) {
            setHasData(true);
            calculateHealthAndAlerts();
        } else {
            alert("Please enter both Moisture and Temperature values.");
        }
    };

    const calculateHealthAndAlerts = () => {
        let newAlerts = [];
        let newHealth = 100;

        const m = parseInt(moisture);
        const t = parseInt(temp);

        // Moisture Logic
        if (m < 30) {
            newAlerts.push({
                type: "warning",
                title: "Low Moisture Detected",
                message: `Moisture is ${m}%. Water your plant immediately.`,
                time: "Just now"
            });
            newHealth -= 20;
        } else if (m > 80) {
            newAlerts.push({
                type: "warning",
                title: "High Moisture Detected",
                message: `Moisture is ${m}%. Risk of root rot.`,
                time: "Just now"
            });
            newHealth -= 10;
        }

        // Temperature Logic
        if (t > 35) {
            newAlerts.push({
                type: "warning",
                title: "High Temperature",
                message: `Temp is ${t}°C. Move plant to a cooler spot.`,
                time: "Just now"
            });
            newHealth -= 15;
        } else if (t < 10) {
            newAlerts.push({
                type: "warning",
                title: "Low Temperature",
                message: `Temp is ${t}°C. Protect plant from freezing.`,
                time: "Just now"
            });
            newHealth -= 15;
        }

        // Cap health
        if (newHealth < 0) newHealth = 0;

        // If no alerts, add a success alert
        if (newAlerts.length === 0) {
            newAlerts.push({
                type: "success",
                title: "Optimal Conditions",
                message: "Your plant environment is perfect!",
                time: "Just now"
            });
        }

        setAlerts(newAlerts);
        setHealth(newHealth);
    };

    return (
        <div className="min-h-screen bg-[#f0fdf4] dark:bg-gray-900 transition-colors duration-300">
            <Sidebar />
            <div className="lg:ml-64 flex flex-col min-h-screen">
                <Navbar />

                <main className="flex-1 p-6 lg:p-8 mt-28">
                    {/* Welcome Section */}
                    <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-green-900 dark:text-white tracking-tight">Dashboard</h1>
                            <p className="text-green-600 dark:text-gray-400 mt-1">Welcome back! Monitor your plant's health in real-time.</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={toggleTheme}
                                className="p-2.5 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-green-100 dark:border-gray-700 hover:bg-green-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                {theme === "light" ? <Moon className="w-5 h-5 text-green-700" /> : <Sun className="w-5 h-5 text-yellow-400" />}
                            </button>
                            <button className="flex items-center space-x-2 px-5 py-2.5 bg-[#006d32] hover:bg-green-800 text-white rounded-xl shadow-lg shadow-green-900/20 transition-all active:scale-95">
                                <Activity className="w-4 h-4" />
                                <span className="font-medium">Generate Report</span>
                            </button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-green-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
                                    <Leaf className="w-6 h-6 text-green-600 dark:text-green-400" />
                                </div>
                                {hasData ? (
                                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">Healthy</span>
                                ) : (
                                    <span className="text-xs font-bold text-gray-400 bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded-full">Waiting</span>
                                )}
                            </div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Plant Status</p>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{hasData ? "Thriving" : "--"}</h3>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-green-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
                                    <Droplets className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">Normal</span>
                            </div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Soil Moisture</p>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                                {moisture ? `${moisture}%` : "--"}
                            </h3>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-green-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-xl">
                                    <Thermometer className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                                </div>
                                <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full">Optimal</span>
                            </div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Temperature</p>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                                {temp ? `${temp}°C` : "--"}
                            </h3>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Manual Analysis Card */}
                            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-green-100 dark:border-gray-700">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Manual Analysis</h2>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Check your plant's health instantly</p>
                                    </div>
                                    <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-lg">
                                        <Activity className="w-5 h-5 text-green-600 dark:text-green-400" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Soil Moisture (%)</label>
                                        <div className="relative group">
                                            <input
                                                type="number"
                                                value={moisture}
                                                onChange={(e) => setMoisture(e.target.value)}
                                                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3.5 text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                                                placeholder="e.g. 45"
                                            />
                                            <Droplets className="absolute right-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Temperature (°C)</label>
                                        <div className="relative group">
                                            <input
                                                type="number"
                                                value={temp}
                                                onChange={(e) => setTemp(e.target.value)}
                                                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3.5 text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                                                placeholder="e.g. 24"
                                            />
                                            <Thermometer className="absolute right-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleAnalyze}
                                    className="w-full bg-[#006d32] hover:bg-green-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-900/20 transform transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
                                >
                                    <Activity className="w-5 h-5" />
                                    <span>Analyze Plant Health</span>
                                </button>
                            </div>

                            {/* Recent Alerts */}
                            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-green-100 dark:border-gray-700">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                    <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
                                    Recent Alerts
                                </h2>
                                <div className="space-y-4">
                                    {alerts.length > 0 ? (
                                        alerts.map((alert, index) => (
                                            <div key={index} className={`flex items-start p-4 rounded-xl border ${alert.type === 'warning' ? 'bg-orange-50 border-orange-100 dark:bg-orange-900/10 dark:border-orange-900/30' : 'bg-green-50 border-green-100 dark:bg-green-900/10 dark:border-green-900/30'}`}>
                                                <div className={`p-2 rounded-full mr-4 flex-shrink-0 ${alert.type === 'warning' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30' : 'bg-green-100 text-green-600 dark:bg-green-900/30'}`}>
                                                    {alert.type === 'warning' ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                                                </div>
                                                <div>
                                                    <h3 className={`font-bold ${alert.type === 'warning' ? 'text-orange-800 dark:text-orange-400' : 'text-green-800 dark:text-green-400'}`}>{alert.title}</h3>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{alert.message}</p>
                                                    <p className="text-xs text-gray-400 mt-2">{alert.time}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                            <div className="bg-gray-50 dark:bg-gray-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <CheckCircle className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <p>No alerts yet. Analyze data to see health status.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-8">
                            {/* Health Score */}
                            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-green-100 dark:border-gray-700 text-center relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-600"></div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Overall Health Score</h2>

                                {hasData ? (
                                    <>
                                        <div className="relative w-48 h-48 mx-auto mb-6">
                                            {/* Circular Progress Placeholder */}
                                            <svg className="w-full h-full transform -rotate-90">
                                                <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-100 dark:text-gray-700" />
                                                <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={552} strokeDashoffset={552 - (552 * health) / 100} className={`text-green-500 transition-all duration-1000 ease-out ${health < 50 ? 'text-red-500' : health < 80 ? 'text-orange-500' : 'text-green-500'}`} />
                                            </svg>
                                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                                                <span className="text-4xl font-bold text-gray-900 dark:text-white">{health}%</span>
                                                <p className="text-xs text-gray-500 uppercase font-bold mt-1">Excellent</p>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                            Your plant is in great condition! Continue maintaining current moisture and temperature levels.
                                        </p>
                                    </>
                                ) : (
                                    <div className="py-12">
                                        <div className="bg-gray-50 dark:bg-gray-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Activity className="w-10 h-10 text-gray-300 dark:text-gray-600" />
                                        </div>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            Enter moisture and temperature data to calculate health score.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-[#006d32] rounded-3xl p-8 shadow-lg shadow-green-900/20 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                                <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-black/10 rounded-full blur-2xl"></div>

                                <h2 className="text-xl font-bold mb-6 relative z-10">Quick Actions</h2>
                                <div className="space-y-3 relative z-10">
                                    <Link to="/sensors" className="flex items-center justify-between p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors cursor-pointer group">
                                        <div className="flex items-center space-x-3">
                                            <div className="bg-white/20 p-2 rounded-lg">
                                                <Thermometer className="w-5 h-5" />
                                            </div>
                                            <span className="font-medium">Check Sensors</span>
                                        </div>
                                        <ArrowUpRight className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                    <Link to="/ai-assistant" className="flex items-center justify-between p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors cursor-pointer group">
                                        <div className="flex items-center space-x-3">
                                            <div className="bg-white/20 p-2 rounded-lg">
                                                <MessageSquare className="w-5 h-5" />
                                            </div>
                                            <span className="font-medium">Ask AI Assistant</span>
                                        </div>
                                        <ArrowUpRight className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <AIChatbot />
                </main>
            </div>
        </div>
    );
}
