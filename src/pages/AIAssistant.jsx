import { useState } from "react";
import Sidebar from "../components/Layout/Sidebar";
import Navbar from "../components/Layout/Navbar";
import { Bot, Sprout, Sun, Cloud, Thermometer, Search, Droplets, Leaf } from "lucide-react";

export default function AIAssistant() {
    const [plantType, setPlantType] = useState("");
    const [season, setSeason] = useState("spring");
    const [temperature, setTemperature] = useState(22);
    const [humidity, setHumidity] = useState(50);
    const [soilMoisture, setSoilMoisture] = useState(40);
    const [soilType, setSoilType] = useState("loamy");
    const [recommendation, setRecommendation] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleGetRecommendation = (e) => {
        e.preventDefault();
        setLoading(true);
        setRecommendation(null);

        // Mock AI Logic
        setTimeout(() => {
            let result = {
                plant: plantType || "Tomato",
                description: `Based on your inputs (${temperature}°C, ${humidity}% humidity), this environment is suitable for ${plantType || "Tomatoes"}.`,
                tips: ["Water daily", "Ensure 6 hours of sun", "Fertilize weekly"],
                difficulty: "Medium"
            };

            if (plantType.toLowerCase().includes("cactus") || temperature > 30) {
                result = {
                    plant: plantType || "Cactus / Succulents",
                    description: "Perfect for hot environments with minimal water needs.",
                    tips: ["Water sparingly", "Provide direct sunlight", "Use sandy soil"],
                    difficulty: "Easy"
                };
            } else if (plantType.toLowerCase().includes("fern") || humidity > 70) {
                result = {
                    plant: plantType || "Boston Fern",
                    description: "Thrives in high humidity and indirect light.",
                    tips: ["Keep soil consistently moist", "Mist leaves regularly", "Avoid direct sun"],
                    difficulty: "Medium"
                };
            } else if (season === "winter" || temperature < 15) {
                result = {
                    plant: plantType || "Spinach",
                    description: "Spinach thrives in cooler temperatures and is very hardy.",
                    tips: ["Keep soil moist", "Harvest leaves young", "Mulch to retain moisture"],
                    difficulty: "Easy"
                };
            }

            setRecommendation(result);
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
            <Sidebar />
            <div className="lg:ml-64 flex flex-col min-h-screen">
                <Navbar />

                <main className="flex-1 p-6 lg:p-8 mt-28">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-green-800 flex items-center space-x-3">
                            <Bot className="w-8 h-8 text-green-600" />
                            <span>AI Plant Assistant</span>
                        </h1>
                        <p className="text-green-600 mt-1">Get personalized plant recommendations based on your environment.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Input Form */}
                        <div className="bg-white p-8 rounded-xl shadow-lg border border-green-100">
                            <h3 className="text-xl font-bold text-gray-800 mb-6">Environmental Details</h3>
                            <form onSubmit={handleGetRecommendation} className="space-y-6">

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                                        <Leaf className="w-4 h-4 text-green-600" />
                                        <span>Plant Type (Optional)</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={plantType}
                                        onChange={(e) => setPlantType(e.target.value)}
                                        placeholder="e.g., Rose, Basil, Snake Plant"
                                        className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-green-500 focus:outline-none transition-colors bg-white"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                                            <Cloud className="w-4 h-4 text-blue-500" />
                                            <span>Current Season</span>
                                        </label>
                                        <select
                                            value={season}
                                            onChange={(e) => setSeason(e.target.value)}
                                            className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-green-500 focus:outline-none transition-colors bg-white"
                                        >
                                            <option value="spring">Spring</option>
                                            <option value="summer">Summer</option>
                                            <option value="autumn">Autumn</option>
                                            <option value="winter">Winter</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                                            <Sprout className="w-4 h-4 text-green-500" />
                                            <span>Soil Type</span>
                                        </label>
                                        <select
                                            value={soilType}
                                            onChange={(e) => setSoilType(e.target.value)}
                                            className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-green-500 focus:outline-none transition-colors bg-white"
                                        >
                                            <option value="loamy">Loamy (Balanced)</option>
                                            <option value="sandy">Sandy (Drains fast)</option>
                                            <option value="clay">Clay (Retains water)</option>
                                            <option value="peaty">Peaty (Acidic)</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                                        <Thermometer className="w-4 h-4 text-orange-500" />
                                        <span>Average Temperature ({temperature}°C)</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="45"
                                        value={temperature}
                                        onChange={(e) => setTemperature(parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>0°C</span>
                                        <span>45°C</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                                        <Droplets className="w-4 h-4 text-blue-500" />
                                        <span>Humidity ({humidity}%)</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={humidity}
                                        onChange={(e) => setHumidity(parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>0%</span>
                                        <span>100%</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                                        <Droplets className="w-4 h-4 text-teal-500" />
                                        <span>Soil Moisture ({soilMoisture}%)</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={soilMoisture}
                                        onChange={(e) => setSoilMoisture(parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>Dry (0%)</span>
                                        <span>Wet (100%)</span>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center space-x-2 font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <span className="animate-pulse">Analyzing...</span>
                                    ) : (
                                        <>
                                            <Search className="w-5 h-5" />
                                            <span>Get Recommendation</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Recommendation Result */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-xl shadow-lg border border-green-200 flex flex-col justify-center items-center text-center min-h-[400px]">
                            {loading ? (
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mb-4"></div>
                                    <p className="text-green-800 font-medium animate-pulse">Consulting AI Knowledge Base...</p>
                                </div>
                            ) : recommendation ? (
                                <div className="w-full animate-in fade-in zoom-in duration-500">
                                    <div className="bg-white p-4 rounded-full inline-block shadow-md mb-4">
                                        <Sprout className="w-12 h-12 text-green-600" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-green-900 mb-2">{recommendation.plant}</h2>
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${recommendation.difficulty === "Easy" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"
                                        }`}>
                                        Difficulty: {recommendation.difficulty}
                                    </span>
                                    <p className="text-gray-700 mb-6 text-lg">{recommendation.description}</p>

                                    <div className="bg-white/60 rounded-xl p-6 text-left">
                                        <h4 className="font-bold text-green-800 mb-3 flex items-center space-x-2">
                                            <Sun className="w-5 h-5" />
                                            <span>Care Tips</span>
                                        </h4>
                                        <ul className="space-y-2">
                                            {recommendation.tips.map((tip, index) => (
                                                <li key={index} className="flex items-start space-x-2 text-gray-700">
                                                    <span className="text-green-500 font-bold">•</span>
                                                    <span>{tip}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-gray-500">
                                    <Bot className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                    <p className="text-lg">Enter your environmental details to get a personalized plant recommendation.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
