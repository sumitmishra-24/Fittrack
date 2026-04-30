import { dietPlan, mockUser } from "../store/data";
import { motion } from "motion/react";
import { Utensils, Droplet, Flame, Leaf } from "lucide-react";

export default function DietPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans text-white">
      <div className="mb-8 border-b border-white/10 pb-6">
        <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-2">Personalized Diet</h1>
        <p className="text-[10px] font-bold tracking-widest uppercase opacity-60">Based on your ({mockUser.dietPreference}) preference for {dietPlan.goal}.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-[#1A1A1A] border-l-4 border-[#CCFF00] p-6 flex flex-col justify-between h-[180px]">
           <span className="text-[10px] font-black tracking-widest uppercase opacity-60 flex items-center">
             <Flame className="w-3 h-3 mr-2" /> Daily Target
           </span>
           <h4 className="text-7xl font-black text-[#CCFF00] tracking-tighter">{dietPlan.calories} <span className="text-xl font-bold uppercase tracking-normal opacity-60">kcal</span></h4>
           <div className="w-full bg-white/10 h-1 mt-2">
             <div className="bg-[#CCFF00] h-full w-[80%]"></div>
           </div>
        </div>
        
        <div className="bg-[#1A1A1A] p-6 flex flex-col justify-between h-[180px]">
           <span className="text-[10px] font-black tracking-widest uppercase opacity-60 flex items-center">
             <Droplet className="w-3 h-3 mr-2" /> Protein Target
           </span>
           <h4 className="text-7xl font-black text-white tracking-tighter">{parseInt(dietPlan.protein)}<span className="text-xl font-bold uppercase tracking-normal opacity-60">g</span></h4>
           <div className="w-full bg-white/10 h-1 mt-2">
             <div className="bg-white h-full w-[60%]"></div>
           </div>
        </div>

        <div className="bg-[#1A1A1A] p-6 flex flex-col justify-between h-[180px]">
           <span className="text-[10px] font-black tracking-widest uppercase opacity-60 flex items-center">
             <Leaf className="w-3 h-3 mr-2" /> Diet Type
           </span>
           <h4 className="text-4xl font-black text-white uppercase mt-4 leading-none">{mockUser.dietPreference}</h4>
           <p className="text-[10px] font-bold text-[#CCFF00] uppercase mt-auto tracking-widest">Goal Setup Complete</p>
        </div>
      </div>

      <div className="bg-[#1A1A1A] border-t-4 border-[#CCFF00]">
         <div className="px-6 py-6 border-b border-white/10 flex items-center">
            <h2 className="text-3xl font-black uppercase tracking-tighter">Today's Meals</h2>
         </div>
         <div className="divide-y divide-white/10">
           {dietPlan.meals.map((meal, idx) => (
             <motion.div 
               key={idx}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.1 }}
               className="p-6 flex flex-col md:flex-row md:items-center hover:bg-white/5 transition-colors gap-4"
             >
               <div className="md:w-64 flex-shrink-0">
                  <span className="inline-block px-4 py-2 bg-white/10 text-white text-[10px] font-black uppercase tracking-widest border border-white/20">
                    {meal.type}
                  </span>
               </div>
               <div className="flex-1">
                 <p className="text-xl md:text-2xl font-black text-[#CCFF00] uppercase tracking-tight mb-2">{meal.items}</p>
                 <p className="text-[10px] text-white font-bold opacity-50 uppercase tracking-widest">Focus on portion control and hydration.</p>
               </div>
               <div className="mt-4 md:mt-0">
                 <button className="px-6 py-3 bg-transparent border border-white/20 text-[10px] font-black uppercase tracking-widest hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors">
                   Swap Meal
                 </button>
               </div>
             </motion.div>
           ))}
         </div>
      </div>
    </div>
  );
}
