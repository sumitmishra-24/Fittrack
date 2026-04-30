import { progressData } from "../store/data";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from "motion/react";
import { TrendingDown, Activity, Flame } from "lucide-react";

export default function ProgressPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans text-white">
       <div className="mb-8 border-b border-white/10 pb-6">
        <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-2">Your Progress</h1>
        <p className="text-[10px] font-bold tracking-widest uppercase opacity-60">Track your journey and visualize your consistency over time.</p>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-esa0 pt-4">
          
          {/* Weight Tracking Chart */}
          <motion.div 
            className="bg-[#1A1A1A] p-6 border-l-4 border-[#CCFF00] flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-black tracking-widest uppercase opacity-60 block mb-1">Weekly Trend</span>
                <h2 className="text-3xl font-black uppercase">Weight (kg)</h2>
              </div>
              <span className="text-sm font-black text-black bg-[#CCFF00] px-3 py-1 uppercase tracking-widest">-1.0 kg</span>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData} margin={{ top: 5, right: 0, bottom: 5, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" tickFormatter={(str) => str.substring(5)} axisLine={false} tickLine={false} tick={{fill: '#ffffff', opacity: 0.6, fontSize: 10, fontWeight: 'bold'}} dy={15} />
                  <YAxis domain={['auto', 'auto']} axisLine={false} tickLine={false} tick={{fill: '#ffffff', opacity: 0.6, fontSize: 10, fontWeight: 'bold'}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid #CCFF00', color: '#ffffff', textTransform: 'uppercase', fontSize: '12px', fontWeight: 'bold' }}
                    itemStyle={{ color: '#CCFF00' }}
                  />
                  <Line type="monotone" dataKey="weight" stroke="#CCFF00" strokeWidth={4} activeDot={{ r: 6, fill: '#0A0A0A', stroke: '#CCFF00', strokeWidth: 2 }} dot={{ r: 4, fill: '#CCFF00' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between text-[10px] font-bold opacity-30 mt-6 tracking-widest uppercase">
              <span>Past 7 Days Tracking</span>
              <span>Updated Today</span>
            </div>
          </motion.div>

          {/* Calories Tracking Chart */}
          <motion.div 
            className="bg-[#1A1A1A] p-6 border-l-4 border-white flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
               <div>
                  <span className="text-[10px] font-black tracking-widest uppercase opacity-60 block mb-1">Energy Output</span>
                  <h2 className="text-3xl font-black uppercase">Calories Burned</h2>
               </div>
              <span className="text-[10px] font-black text-black bg-white px-3 py-1 uppercase tracking-widest">Avg 470 kcal</span>
            </div>
            <div className="h-[300px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={progressData} margin={{ top: 5, right: 0, bottom: 5, left: -20 }}>
                  <defs>
                    <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" tickFormatter={(str) => str.substring(5)} axisLine={false} tickLine={false} tick={{fill: '#ffffff', opacity: 0.6, fontSize: 10, fontWeight: 'bold'}} dy={15} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#ffffff', opacity: 0.6, fontSize: 10, fontWeight: 'bold'}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid #ffffff', color: '#ffffff', textTransform: 'uppercase', fontSize: '12px', fontWeight: 'bold' }}
                    itemStyle={{ color: '#ffffff' }}
                  />
                  <Area type="monotone" dataKey="caloriesBurned" stroke="#ffffff" strokeWidth={4} fillOpacity={1} fill="url(#colorCalories)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between text-[10px] font-bold opacity-30 mt-6 tracking-widest uppercase">
              <span>Activity Output</span>
              <span>Daily Metrics</span>
            </div>
          </motion.div>

       </div>
       
       {/* Body Measurements Mock */}
       <div className="bg-[#1A1A1A] border-t-4 border-[#CCFF00] p-8 mt-12">
          <h2 className="text-3xl font-black uppercase mb-8 border-b border-white/10 pb-4">
             Body Measurements
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
             <div className="p-6 bg-[#0A0A0A] border border-white/10 hover:border-[#CCFF00] transition-colors">
                <p className="text-[10px] font-black tracking-widest uppercase opacity-60">Chest</p>
                <p className="text-4xl font-black text-white mt-4">102 <span className="text-sm">cm</span></p>
             </div>
             <div className="p-6 bg-[#0A0A0A] border border-white/10 hover:border-[#CCFF00] transition-colors">
                <p className="text-[10px] font-black tracking-widest uppercase opacity-60">Waist</p>
                <p className="text-4xl font-black text-white mt-4">82 <span className="text-sm">cm</span></p>
             </div>
             <div className="p-6 bg-[#0A0A0A] border border-white/10 hover:border-[#CCFF00] transition-colors">
                <p className="text-[10px] font-black tracking-widest uppercase opacity-60">Arms</p>
                <p className="text-4xl font-black text-[#CCFF00] mt-4">36 <span className="text-sm text-white">cm</span></p>
             </div>
             <div className="p-6 bg-[#0A0A0A] border border-white/10 hover:border-[#CCFF00] transition-colors">
                <p className="text-[10px] font-black tracking-widest uppercase opacity-60">Thighs</p>
                <p className="text-4xl font-black text-white mt-4">54 <span className="text-sm">cm</span></p>
             </div>
          </div>
       </div>

    </div>
  );
}
