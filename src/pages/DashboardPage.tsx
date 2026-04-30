import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Circle, Flame, TrendingUp, Presentation, Lightbulb } from "lucide-react";
import { mockUser, dailyTasks, aiSuggestions, workoutPlan } from "../store/data";
import { cn } from "../lib/utils";

export default function DashboardPage() {
  const [tasks, setTasks] = useState(dailyTasks);
  const todaysWorkout = workoutPlan[0];

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      <header className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex-1 min-w-0">
          <h2 className="text-4xl font-black italic tracking-tighter uppercase text-white">
            Welcome back, <span className="text-[#CCFF00]">{mockUser.name.split(' ')[0]}</span>
          </h2>
          <p className="mt-1 text-[10px] font-bold tracking-widest uppercase opacity-60 text-white">
            Let's crush your {mockUser.goal.toLowerCase()} goals today.
          </p>
        </div>
        <div className="flex items-center bg-[#CCFF00] text-black px-4 py-2 font-black uppercase tracking-widest text-[10px]">
          <Flame className="w-5 h-5 text-black mr-2" />
          <span>{mockUser.streak} Day Streak 🔥</span>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 flex-grow">
        
        {/* Left Col: Workout Plan */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <motion.div 
            className="bg-[#1A1A1A] p-6 border-l-4 border-[#CCFF00] flex-grow flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-start mb-6">
              <Link to="/workout" className="hover:opacity-80 transition-opacity">
                <h2 className="text-5xl font-black leading-none uppercase text-white">TODAY<br/>WORKOUT</h2>
              </Link>
              <div className="bg-[#CCFF00] text-black px-2 py-1 text-[10px] font-black uppercase">{todaysWorkout.day}</div>
            </div>
            
            <h3 className="text-lg font-bold text-[#CCFF00] uppercase mb-4">{todaysWorkout.focus}</h3>
            
            <div className="space-y-4 flex-grow">
              {todaysWorkout.exercises.map((exercise, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-white/10 pb-4 pt-2">
                  <div>
                    <p className="font-bold uppercase text-white hover:text-[#CCFF00] cursor-pointer transition-colors">{exercise.name}</p>
                    <p className="text-[10px] uppercase font-bold opacity-50 tracking-widest text-white">{exercise.sets} Sets • {exercise.reps} Reps</p>
                  </div>
                  <div className="w-5 h-5 border border-white/20 rounded-sm"></div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Mid Col: Tasks & AI Coach */}
        <div className="lg:col-span-4 flex flex-col space-y-6">
          <motion.div 
            className="bg-[#CCFF00] p-6 text-black border-l-4 border-black"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-start">
               <div className="flex-shrink-0 mt-1">
                 <Lightbulb className="h-6 w-6 text-black" />
               </div>
               <div className="ml-3">
                 <h3 className="text-[10px] font-black tracking-widest uppercase mb-4">Coach Insights</h3>
                 <div className="text-2xl leading-tight font-black uppercase italic space-y-4">
                   {aiSuggestions.map((suggestion, idx) => (
                     <p key={idx}>"{suggestion}"</p>
                   ))}
                 </div>
               </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-[#1A1A1A] p-6 border-b-4 border-white/10 flex-grow"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-[10px] font-black tracking-widest uppercase opacity-60 mb-2 border-b border-white/10 pb-4 text-white">
              Daily Objectives
            </h3>
            <div className="w-full bg-white/10 h-1 mt-4 mb-6 relative">
              <div 
                className="bg-[#CCFF00] h-full absolute left-0 top-0 transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <ul className="space-y-2">
              <AnimatePresence>
                {tasks.map((task) => (
                  <motion.li 
                    key={task.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-between items-center border-b border-white/10 pb-3 pt-3 cursor-pointer group"
                    onClick={() => toggleTask(task.id)}
                  >
                    <div>
                         <span className={cn(
                           "text-sm font-bold uppercase transition-colors", 
                           task.completed ? "text-white/40 line-through" : "text-white group-hover:text-[#CCFF00]"
                         )}>
                           {task.title}
                         </span>
                    </div>
                    {task.completed ? (
                      <div className="w-5 h-5 bg-[#CCFF00] flex items-center justify-center">
                         <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path></svg>
                      </div>
                    ) : (
                      <div className="w-5 h-5 border border-white/20 group-hover:border-[#CCFF00] transition-colors rounded-sm"></div>
                    )}
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </motion.div>
        </div>

        {/* Right Col: Stats */}
        <div className="lg:col-span-3 flex flex-col space-y-6">
           <motion.div 
             className="bg-[#1A1A1A] p-6 border-b-4 border-[#CCFF00]"
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.3 }}
           >
              <h3 className="text-[10px] font-black tracking-widest uppercase opacity-60 mb-6 text-white border-b border-white/10 pb-4">
                Stats Overview
              </h3>
              <div className="space-y-6">
                <div>
                  <p className="text-5xl font-black uppercase text-[#CCFF00] mb-1">{mockUser.weight}</p>
                  <p className="text-[10px] font-bold tracking-widest opacity-60 uppercase text-white">Current Weight (kg)</p>
                </div>
                <div>
                  <p className="text-3xl leading-none font-black uppercase text-white mb-2">{mockUser.goal}</p>
                  <p className="text-[10px] font-bold tracking-widest opacity-60 uppercase text-white">Primary Goal</p>
                </div>
                <div>
                  <p className="text-3xl leading-none font-black uppercase text-white mb-2">{mockUser.activityLevel}</p>
                  <p className="text-[10px] font-bold tracking-widest opacity-60 uppercase text-white">Activity Level</p>
                </div>
              </div>
           </motion.div>
        </div>
        
      </div>
    </div>
  );
}
