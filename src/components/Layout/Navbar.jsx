import { Bell, Menu, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-green-100 dark:border-gray-800 z-50 px-6 lg:px-8 flex items-center justify-between transition-all duration-300">
      {/* Mobile Menu Button */}
      <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors">
        <Menu className="w-6 h-6" />
      </button>

      {/* Right Side Actions */}
      <div className="ml-auto flex items-center space-x-4">
        <button className="relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-all hover:text-green-600 dark:hover:text-green-400">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-900"></span>
        </button>

        <Link to="/profile" className="flex items-center space-x-3 pl-4 border-l border-gray-200 dark:border-gray-700 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-green-600 transition-colors">Aryan Singh</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Premium User</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 p-0.5 shadow-md group-hover:shadow-lg transition-all group-hover:scale-105">
            <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
              <User className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
}
