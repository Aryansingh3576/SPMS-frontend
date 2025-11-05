import Sidebar from "../components/Layout/Sidebar";
import Navbar from "../components/Layout/Navbar";
import { Thermometer, Droplets, Sprout } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Sidebar - Responsive positioning */}
      <Sidebar />

      {/* Main Content Area - Responsive margin */}
      <div className="lg:ml-64">
        {/* Navbar - Responsive positioning */}
        <Navbar />

        {/* Content - Responsive padding and offset */}
        <main className="pt-20 px-4 sm:px-6 lg:px-8 pb-6 min-h-screen">
          
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-green-800">Dashboard</h2>
            <p className="text-sm sm:text-base text-green-600 mt-1">Monitor your plant's health in real-time</p>
          </div>

          {/* Stats Grid - Fully responsive columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">

            {/* Temperature Card */}
            <div className="bg-white rounded-xl shadow-lg border border-green-100 hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-orange-100 p-2 sm:p-3 rounded-lg">
                    <Thermometer className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                  </div>
                  <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 sm:px-3 py-1 rounded-full">
                    Live
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">Temperature</p>
                <p className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">-- °C</p>
                <div className="pt-3 sm:pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">Optimal: 18-24°C</p>
                </div>
              </div>
              <div className="h-2 bg-gradient-to-r from-orange-400 to-orange-500"></div>
            </div>

            {/* Humidity Card */}
            <div className="bg-white rounded-xl shadow-lg border border-green-100 hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-100 p-2 sm:p-3 rounded-lg">
                    <Droplets className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                  <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 sm:px-3 py-1 rounded-full">
                    Live
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">Humidity</p>
                <p className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">-- %</p>
                <div className="pt-3 sm:pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">Optimal: 40-60%</p>
                </div>
              </div>
              <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-500"></div>
            </div>

            {/* Soil Moisture Card */}
            <div className="bg-white rounded-xl shadow-lg border border-green-100 hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-green-100 p-2 sm:p-3 rounded-lg">
                    <Sprout className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  </div>
                  <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 sm:px-3 py-1 rounded-full">
                    Live
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">Soil Moisture</p>
                <p className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">--</p>
                <div className="pt-3 sm:pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">Keep soil moist</p>
                </div>
              </div>
              <div className="h-2 bg-gradient-to-r from-green-400 to-green-500"></div>
            </div>

          </div>

          {/* System Status Box */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-green-100">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <h3 className="text-base sm:text-lg font-semibold text-green-800">System Status</h3>
            </div>
            <p className="text-sm sm:text-base text-gray-600">
              All sensors are connected and monitoring your plant's environment.
            </p>
          </div>

        </main>
      </div>
    </div>
  );
}