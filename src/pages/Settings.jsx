import { useEffect, useState, useContext } from "react";
import Sidebar from "../components/Layout/Sidebar";
import Navbar from "../components/Layout/Navbar";
import axios from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { Settings as SettingsIcon, Droplets, Zap, Save, Info } from "lucide-react";

export default function Settings() {
  const { user } = useContext(AuthContext);
  const [threshold, setThreshold] = useState("");
  const [smartMode, setSmartMode] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await axios.get(`/settings/${user}`);
      setThreshold(res.data.moistureThreshold);
      setSmartMode(res.data.smartMode);
    } catch (err) {
      console.log(err);
    }
  };

  const updateSettings = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/settings", {
        username: user,
        moistureThreshold: threshold,
        smartMode,
      });
      alert("Settings updated");
    } catch (err) {
      alert("Error updating settings");
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Sidebar />
      <div className="lg:ml-64 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1 p-6 lg:p-8 mt-28">
          {/* Page Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-green-800 mb-2">Settings</h2>
            <p className="text-green-600">Configure your smart plant monitoring preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Settings Form */}
            <div className="lg:col-span-2">
              <form
                className="bg-white rounded-xl shadow-lg p-8 border-2 border-green-100"
                onSubmit={updateSettings}
              >
                <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <SettingsIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">System Configuration</h3>
                    <p className="text-sm text-gray-500">Customize your plant monitoring settings</p>
                  </div>
                </div>

                {/* Moisture Threshold Setting */}
                <div className="mb-6">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                    <Droplets className="w-5 h-5 text-blue-600" />
                    <span>Moisture Threshold</span>
                  </label>
                  <input
                    type="number"
                    value={threshold}
                    onChange={(e) => setThreshold(e.target.value)}
                    className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all text-gray-800 font-medium"
                    placeholder="Enter moisture threshold value"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2 flex items-start space-x-1">
                    <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <span>Set the minimum moisture level before watering alert. Lower values mean drier soil.</span>
                  </p>
                </div>

                {/* Smart Mode Setting */}
                <div className="mb-8">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                    <Zap className="w-5 h-5 text-yellow-600" />
                    <span>Smart Mode</span>
                  </label>
                  <select
                    className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all text-gray-800 font-medium appearance-none bg-white cursor-pointer"
                    value={smartMode}
                    onChange={(e) => setSmartMode(e.target.value === "true")}
                  >
                    <option value="true">ON - Automatic monitoring and alerts</option>
                    <option value="false">OFF - Manual monitoring only</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-2 flex items-start space-x-1">
                    <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <span>Smart Mode enables AI-powered recommendations and automatic notifications.</span>
                  </p>
                </div>

                {/* Save Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center space-x-2 font-semibold"
                >
                  <Save className="w-5 h-5" />
                  <span>Save Settings</span>
                </button>
              </form>
            </div>

            {/* Info Sidebar */}
            <div className="space-y-6">
              {/* Current User Card */}
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl shadow-lg p-6 border-2 border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-3">Account Info</h3>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Logged in as</p>
                  <p className="text-lg font-bold text-green-700">{user}</p>
                </div>
              </div>

              {/* Tips Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-100">
                <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center space-x-2">
                  <Info className="w-5 h-5" />
                  <span>Settings Guide</span>
                </h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-start space-x-2">
                      <Droplets className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-sm text-blue-900 mb-1">Moisture Threshold</p>
                        <p className="text-xs text-blue-700">Adjust based on your plant type. Most plants prefer 30-60.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 rounded-lg p-4">
                    <div className="flex items-start space-x-2">
                      <Zap className="w-4 h-4 text-yellow-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-sm text-yellow-900 mb-1">Smart Mode</p>
                        <p className="text-xs text-yellow-700">Enables predictive watering and health alerts.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
                <h3 className="text-lg font-semibold mb-4">System Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-100">Sensors</span>
                    <span className="font-semibold">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-100">Mode</span>
                    <span className="font-semibold">{smartMode ? "Smart" : "Manual"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-100">Connection</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="font-semibold">Online</span>
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