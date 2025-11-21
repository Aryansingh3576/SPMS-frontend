import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Sensors from "./pages/Sensors";
import DataAnalytics from "./pages/DataAnalytics";
import AIAssistant from "./pages/AIAssistant";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/Layout/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/sensors" element={<Sensors />} />
                    <Route path="/analytics" element={<DataAnalytics />} />
                    <Route path="/ai-assistant" element={<AIAssistant />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
