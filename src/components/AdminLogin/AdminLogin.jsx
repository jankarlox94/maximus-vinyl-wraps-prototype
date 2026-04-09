import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient"; // Adjust the import path if necessary
import {
  Lock,
  Mail,
  KeyRound,
  AlertCircle,
  Loader2,
  ArrowLeft,
} from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();

  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI State
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Authenticate with Supabase
      const { data, error: authError } = await supabase.auth.signInWithPassword(
        {
          email,
          password,
        },
      );

      if (authError) {
        throw authError;
      }

      // If login is successful, React Router pushes them to the protected dashboard.
      // (The ProtectedRoute component will handle verifying if they are on the 3-person VIP list)
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err.message);
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Back to Store Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 text-slate-400 hover:text-white flex items-center gap-2 transition-colors text-sm font-medium"
      >
        <ArrowLeft size={16} /> Back to Storefront
      </button>

      <div className="w-full max-w-md z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-slate-800 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-700 shadow-lg">
            <Lock size={32} className="text-orange-500" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Maximus<span className="text-orange-500">ADMIN</span>
          </h1>
          <p className="text-slate-400 mt-2">Authorized personnel only.</p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-8">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg flex items-start gap-3 mb-6 animate-in fade-in slide-in-from-top-2">
              <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                  placeholder="admin@maximusvinyl.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <KeyRound size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all mt-4 disabled:bg-slate-600 disabled:text-slate-400 flex justify-center items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Secure Login"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-500 mt-8">
          Maximus Vinyl Wrap & Print &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
