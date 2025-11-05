import { Link } from "react-router-dom";
import { LayoutDashboard, Activity, Settings, Sprout } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="hidden lg:block fixed left-0 top-0 w-64 bg-gradient-to-b from-green-800 via-green-700 to-green-900 text-white h-screen shadow-2xl z-30">
      <div className="p-6 flex flex-col h-full">
        {/* Logo Section */}
        <div className="mb-8 pb-6 border-b border-green-600">
          <div className="flex items-center space-x-3">
            <div className="bg-green-600 p-2.5 rounded-xl shadow-lg">
              <Sprout className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Smart Plant</h2>
              <p className="text-xs text-green-200">Monitoring System</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2 flex-1">
          <Link
            className="flex items-center space-x-3 hover:bg-green-600 bg-green-700/30 p-3 rounded-lg transition-all duration-200 group hover:shadow-md hover:translate-x-1"
            to="/dashboard"
          >
            <LayoutDashboard className="w-5 h-5 text-green-300 group-hover:text-white transition-colors" />
            <span className="font-medium text-green-100 group-hover:text-white">Dashboard</span>
          </Link>

          <Link
            className="flex items-center space-x-3 hover:bg-green-600 bg-green-700/30 p-3 rounded-lg transition-all duration-200 group hover:shadow-md hover:translate-x-1"
            to="/sensors"
          >
            <Activity className="w-5 h-5 text-green-300 group-hover:text-white transition-colors" />
            <span className="font-medium text-green-100 group-hover:text-white">Sensors</span>
          </Link>

          <Link
            className="flex items-center space-x-3 hover:bg-green-600 bg-green-700/30 p-3 rounded-lg transition-all duration-200 group hover:shadow-md hover:translate-x-1"
            to="/settings"
          >
            <Settings className="w-5 h-5 text-green-300 group-hover:text-white transition-colors" />
            <span className="font-medium text-green-100 group-hover:text-white">Settings</span>
          </Link>
        </nav>

        {/* Footer Section */}
        <div className="mt-auto pt-6 border-t border-green-600">
          <div className="bg-green-600/30 backdrop-blur-sm p-3 rounded-lg">
            <p className="text-xs text-green-200 text-center">
              🌱 Keeping your plants healthy
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}