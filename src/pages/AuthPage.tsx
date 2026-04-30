import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Activity } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Activity className="h-16 w-16 text-[#CCFF00]" />
        </div>
        <h2 className="mt-6 text-center text-4xl sm:text-5xl font-black italic tracking-tighter uppercase">
          {isLogin ? "Sign in" : "Join FitTrack"}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div 
          className="bg-[#1A1A1A] py-8 px-4 sm:px-10 border border-[#CCFF00]/20 max-h-screen"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isLogin ? (
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-[10px] font-black tracking-widest uppercase opacity-60 mb-2">Email address</label>
                <div className="mt-1">
                  <input type="email" required className="appearance-none block w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] text-sm font-bold placeholder-white/20 uppercase transition-colors outline-none text-white" placeholder="rahul@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black tracking-widest uppercase opacity-60 mb-2">Password</label>
                <div className="mt-1">
                  <input type="password" required className="appearance-none block w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] text-sm font-bold placeholder-white/20 uppercase transition-colors outline-none text-white" placeholder="••••••••" />
                </div>
              </div>
              <div className="pt-2">
                <button type="submit" className="w-full flex justify-center py-4 bg-[#CCFF00] text-black font-black text-[10px] uppercase tracking-widest hover:bg-white transition-colors">
                  Sign in
                </button>
              </div>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={handleRegister}>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-[10px] font-black tracking-widest uppercase opacity-60 mb-1">Full Name</label>
                  <input type="text" required className="block w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] text-sm font-bold placeholder-white/20 uppercase transition-colors outline-none text-white" placeholder="Rahul Sharma" />
                </div>
                <div>
                  <label className="block text-[10px] font-black tracking-widest uppercase opacity-60 mb-1">Email</label>
                  <input type="email" required className="block w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] text-sm font-bold placeholder-white/20 uppercase transition-colors outline-none text-white" placeholder="rahul@example.com" />
                </div>
                <div>
                  <label className="block text-[10px] font-black tracking-widest uppercase opacity-60 mb-1">Password</label>
                  <input type="password" required className="block w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] text-sm font-bold placeholder-white/20 uppercase transition-colors outline-none text-white" placeholder="••••••••" />
                </div>

                <div className="col-span-2 mt-4 pt-4 border-t border-white/10">
                  <h3 className="text-xs font-black tracking-widest uppercase text-[#CCFF00] mb-4">Fitness Profile</h3>
                </div>

                <div>
                  <label className="block text-[10px] font-black tracking-widest uppercase opacity-60 mb-1">Age</label>
                  <input type="number" required className="block w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] text-sm font-bold text-white outline-none" defaultValue={21} />
                </div>
                <div>
                  <label className="block text-[10px] font-black tracking-widest uppercase opacity-60 mb-1">Gender</label>
                  <select className="block w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] text-sm font-bold text-white outline-none uppercase">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black tracking-widest uppercase opacity-60 mb-1">Height (cm)</label>
                  <input type="number" required className="block w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] text-sm font-bold text-white outline-none" defaultValue={170} />
                </div>
                <div>
                  <label className="block text-[10px] font-black tracking-widest uppercase opacity-60 mb-1">Weight (kg)</label>
                  <input type="number" required className="block w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] text-sm font-bold text-white outline-none" defaultValue={65} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-[10px] font-black tracking-widest uppercase opacity-60 mb-1">Goal</label>
                  <select className="block w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] text-sm font-bold text-white outline-none uppercase">
                    <option>Muscle Gain</option>
                    <option>Weight Loss</option>
                    <option>Maintain</option>
                  </select>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-[10px] font-black tracking-widest uppercase opacity-60 mb-1">Diet</label>
                  <select className="block w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] text-sm font-bold text-white outline-none uppercase">
                    <option>Vegetarian</option>
                    <option>Non-Vegetarian</option>
                    <option>Vegan</option>
                  </select>
                </div>
              </div>
              <div className="pt-4">
                <button type="submit" className="w-full flex justify-center py-4 bg-[#CCFF00] text-black font-black text-[10px] uppercase tracking-widest hover:bg-white transition-colors">
                  Register & Continue
                </button>
              </div>
            </form>
          )}

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-[10px] font-black tracking-widest uppercase text-white/40">
                <span className="px-4 bg-[#1A1A1A]">
                  {isLogin ? "New to FitTrack?" : "Already have an account?"}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="w-full flex justify-center py-3 border border-white/20 bg-transparent text-[10px] uppercase tracking-widest font-black hover:bg-white/5 transition-colors text-white"
              >
                {isLogin ? "Create an account" : "Sign in instead"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
