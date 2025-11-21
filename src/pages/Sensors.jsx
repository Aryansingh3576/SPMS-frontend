import { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Layout/Sidebar";
import Navbar from "../components/Layout/Navbar";
import AIChatbot from "../components/AIChatbot";
import { Thermometer, Droplets, Sprout, Activity, Bot, Sparkles, MessageSquare, Send, CheckCircle2, AlertTriangle, Save, Loader2 } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Sensors() {
  const { theme } = useTheme();
  const [temp, setTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [soilMoisture, setSoilMoisture] = useState("");
  const [aiAdvice, setAiAdvice] = useState(null);
  const [loading, setLoading] = useState(false);

  // Follow-up state
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  // Load saved inputs on mount
  useEffect(() => {
    const savedInputs = JSON.parse(localStorage.getItem('sensorInputs') || '{}');
    if (savedInputs.temp) setTemp(savedInputs.temp);
    if (savedInputs.humidity) setHumidity(savedInputs.humidity);
    if (savedInputs.soilMoisture) setSoilMoisture(savedInputs.soilMoisture);
  }, []);

  const saveData = () => {
    localStorage.setItem('sensorInputs', JSON.stringify({ temp, humidity, soilMoisture }));
    alert("Readings saved successfully!");
  };

  const generateAIAdvice = () => {
    if (!temp || !humidity || !soilMoisture) {
      alert("Please enter all sensor values first!");
      return;
    }

    setLoading(true);
    setAiAdvice(null);

    // Simulate AI Analysis
    setTimeout(() => {
      const t = parseInt(temp);
      const h = parseInt(humidity);
      const m = parseInt(soilMoisture);

      let status = "Healthy";
      let summary = "Your plant is thriving!";
      let details = "All vital signs are within the optimal range.";
      let actions = ["Keep up the good work!", "Monitor for any sudden changes."];

      if (m < 30) {
        status = "Warning";
        summary = "Low Soil Moisture";
        details = `Soil moisture is critically low at ${m}%. The plant is at risk of dehydration.`;
        actions = ["Water immediately until soil is saturated.", "Check soil drainage."];
      } else if (t > 35) {
        status = "Warning";
        summary = "High Temperature";
        details = `Temperature is ${t}°C, which is too high for this plant species.`;
        actions = ["Move to a cooler location.", "Increase humidity if possible."];
      }

      setAiAdvice({ status, summary, details, actions });
      setLoading(false);
    }, 1500);
  };

  const handleAskFollowUp = () => {
    if (!question.trim()) return;

    const newHistory = [...chatHistory, { role: 'user', text: question }];
    setChatHistory(newHistory);
    setQuestion("");

    // Simulate AI Response
    setTimeout(() => {
      let response = "That's a good question. Based on the current readings, I suggest keeping a close eye on the moisture levels.";
      if (question.toLowerCase().includes("water")) {
        response = "Since the moisture level is " + soilMoisture + "%, you " + (parseInt(soilMoisture) < 30 ? "should water it now." : "don't need to water yet.");
      }
      setChatHistory([...newHistory, { role: 'ai', text: response }]);
    }, 1000);
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
                Sensor <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Readings</span>
              </h1>
              <p className="text-green-600 dark:text-gray-400">
                Real-time monitoring and AI-driven insights for your plant.
              </p>
            </div>

            {/* Sensor Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Temperature Card */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-green-100 dark:border-gray-700 group hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-orange-100 dark:bg-orange-500/20 p-3 rounded-2xl group-hover:scale-110 transition-transform">
                    <Thermometer className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Temperature</label>
                <div className="relative">
                  <input
                    type="number"
                    value={temp}
                    onChange={(e) => setTemp(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-gray-900 border-0 rounded-xl px-4 py-3 text-2xl font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500/20 transition-all outline-none"
                    placeholder="--"
                  />
                  <span className="absolute right-4 top-3.5 text-gray-400 font-medium">°C</span>
                </div>
              </div>

              {/* Humidity Card */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-green-100 dark:border-gray-700 group hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-100 dark:bg-blue-500/20 p-3 rounded-2xl group-hover:scale-110 transition-transform">
                    <Droplets className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Humidity</label>
                <div className="relative">
                  <input
                    type="number"
                    value={humidity}
                    onChange={(e) => setHumidity(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-gray-900 border-0 rounded-xl px-4 py-3 text-2xl font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                    placeholder="--"
                  />
                  <span className="absolute right-4 top-3.5 text-gray-400 font-medium">%</span>
                </div>
              </div>

              {/* Soil Moisture Card */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-green-100 dark:border-gray-700 group hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-green-100 dark:bg-green-500/20 p-3 rounded-2xl group-hover:scale-110 transition-transform">
                    <Sprout className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Soil Moisture</label>
                <div className="relative">
                  <input
                    type="number"
                    value={soilMoisture}
                    onChange={(e) => setSoilMoisture(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-gray-900 border-0 rounded-xl px-4 py-3 text-2xl font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500/20 transition-all outline-none"
                    placeholder="--"
                  />
                  <span className="absolute right-4 top-3.5 text-gray-400 font-medium">%</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 mb-12">
              <button
                onClick={saveData}
                className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-bold rounded-xl shadow-sm border border-green-100 dark:border-gray-700 hover:bg-green-50 dark:hover:bg-gray-700 transition-all flex items-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>Save Readings</span>
              </button>
              <button
                onClick={generateAIAdvice}
                disabled={loading}
                className="px-8 py-3 bg-[#006d32] hover:bg-green-800 text-white font-bold rounded-xl shadow-lg shadow-green-900/20 transform transition-all hover:scale-105 active:scale-95 flex items-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Bot className="w-5 h-5" />
                )}
                <span>{loading ? "Analyzing..." : "Get AI Advice"}</span>
              </button>
            </div>

            {/* AI Advice Section */}
            {aiAdvice && (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl border border-green-100 dark:border-gray-700 mb-8">
                  <div className="bg-[#006d32] p-6 text-white flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                        <Sparkles className="w-6 h-6 text-yellow-300" />
                      </div>
                      <h2 className="text-xl font-bold">AI Diagnosis</h2>
                    </div>
                    <div className="bg-white/20 px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm border border-white/10">
                      Powered by Gemini
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-start space-x-4 mb-8">
                      <div className={`p-3 rounded-2xl ${aiAdvice.status === 'Healthy' ? 'bg-green-100 text-green-600' :
                        aiAdvice.status === 'Warning' ? 'bg-orange-100 text-orange-600' :
                          'bg-red-100 text-red-600'
                        }`}>
                        {aiAdvice.status === 'Healthy' ? <CheckCircle2 className="w-8 h-8" /> : <AlertTriangle className="w-8 h-8" />}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{aiAdvice.summary}</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{aiAdvice.details}</p>
                      </div>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/10 rounded-2xl p-6 border border-green-100 dark:border-green-900/20">
                      <h4 className="font-bold text-green-900 dark:text-green-400 mb-4 flex items-center">
                        <Sprout className="w-5 h-5 mr-2" />
                        Recommended Actions
                      </h4>
                      <ul className="space-y-3">
                        {aiAdvice.actions.map((action, idx) => (
                          <li key={idx} className="flex items-start text-gray-700 dark:text-gray-300">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Follow-up Chat */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-green-100 dark:border-gray-700">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-green-600" />
                    Ask a follow-up question
                  </h3>

                  <div className="space-y-4 mb-4 max-h-60 overflow-y-auto">
                    {chatHistory.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user'
                          ? 'bg-[#006d32] text-white rounded-br-none'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
                          }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="e.g., How often should I water?"
                      className="flex-1 bg-gray-50 dark:bg-gray-900 border-0 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500/20 outline-none"
                      onKeyPress={(e) => e.key === 'Enter' && handleAskFollowUp()}
                    />
                    <button
                      onClick={handleAskFollowUp}
                      className="bg-[#006d32] hover:bg-green-800 text-white p-3 rounded-xl transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <AIChatbot />
        </main>
      </div>
    </div>
  );
}