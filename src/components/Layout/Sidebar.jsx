import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Thermometer, BarChart3, MessageSquare, Settings, Leaf, LogOut } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: Thermometer, label: "Sensors", path: "/sensors" },
    { icon: BarChart3, label: "Analytics", path: "/analytics" },
    { icon: MessageSquare, label: "AI Assistant", path: "/ai-assistant" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#006d32] dark:bg-gray-900 border-r border-green-600 dark:border-gray-800 z-40 transition-all duration-300 hidden lg:flex flex-col shadow-xl">
      {/* Logo Section */}
      <div className="p-8 flex items-center space-x-3 border-b border-green-600/30 dark:border-gray-800">
        <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm">
          <Leaf className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight leading-tight">
          Smart Plant <br /> Monitoring System
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                                flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-200 group
                                ${isActive
                  ? "bg-green-500/20 text-white font-semibold shadow-sm border border-green-500/30"
                  : "text-green-100 hover:bg-green-700/50 hover:text-white"
                }
                            `}
            >
              <item.icon
                className={`w-5 h-5 transition-colors ${isActive ? "text-white" : "text-green-200 group-hover:text-white"}`}
              />
              <span>{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Profile / Footer */}
      <div className="p-4 border-t border-green-600/30 dark:border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl hover:bg-red-500/10 text-green-100 hover:text-red-200 transition-colors group"
        >
          <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}