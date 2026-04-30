import { useState } from "react";
import { workoutPlan } from "../store/data";
import { motion } from "motion/react";
import { PlayCircle, CheckCircle2, Circle } from "lucide-react";
import { cn } from "../lib/utils";

export default function WorkoutPage() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const toggleExercise = (name: string) => {
    setCompletedExercises(prev => {
      const newSet = new Set(prev);
      if (newSet.has(name)) {
        newSet.delete(name);
      } else {
        newSet.add(name);
      }
      return newSet;
    });
  };

  const currentWorkout = workoutPlan[selectedDay];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-white font-sans">
       <div className="mb-8 border-b border-white/10 pb-6">
        <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-2">Your Workout Plan</h1>
        <p className="text-[10px] font-bold tracking-widest uppercase opacity-60">Track your sets, reps, and watch instructional videos from certified trainers.</p>
       </div>

       {/* Day Selector */}
       <div className="flex space-x-4 overflow-x-auto pb-4 mb-6">
        {workoutPlan.map((plan, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedDay(idx)}
            className={cn(
              "px-6 py-4 text-[10px] font-black uppercase tracking-widest transition-colors",
              selectedDay === idx 
                ? "bg-[#CCFF00] text-black" 
                : "bg-[#1A1A1A] text-white hover:bg-white/10 border border-white/10"
            )}
          >
            {plan.day}: {plan.focus}
          </button>
        ))}
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
             <motion.div 
               key={selectedDay}
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="bg-[#1A1A1A] border-l-4 border-[#CCFF00]"
             >
                <div className="bg-white/5 px-6 py-6 border-b border-white/10 flex justify-between items-center">
                  <h2 className="text-3xl font-black uppercase text-white leading-none">{currentWorkout.focus}</h2>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#CCFF00] whitespace-nowrap">{currentWorkout.exercises.length} Exercises</span>
                </div>
                
                <ul>
                  {currentWorkout.exercises.map((exercise) => {
                    const isCompleted = completedExercises.has(exercise.name);
                    return (
                      <li key={exercise.name} className={cn("p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/10 hover:bg-white/5 transition-colors", isCompleted ? "bg-[#CCFF00]/5" : "")}>
                        <div className="flex items-start gap-4">
                          <button 
                            onClick={() => toggleExercise(exercise.name)}
                            className="mt-1 flex-shrink-0 focus:outline-none"
                          >
                             {isCompleted ? (
                               <div className="w-6 h-6 bg-[#CCFF00] flex items-center justify-center">
                                  <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path></svg>
                               </div>
                             ) : (
                               <div className="w-6 h-6 border-2 border-white/30 hover:border-[#CCFF00] transition-colors rounded-none"></div>
                             )}
                          </button>
                          <div>
                            <h3 className={cn("text-2xl font-black uppercase transition-all mb-2", isCompleted ? "text-white/40 line-through" : "text-white")}>
                              {exercise.name}
                            </h3>
                            <div className="flex flex-wrap gap-3">
                              <span className="bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">{exercise.sets} Sets</span>
                              <span className="bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">{exercise.reps} Reps</span>
                              <span className="bg-transparent border border-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest opacity-60">Rest: {exercise.rest}</span>
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => setActiveVideo(exercise.videoUrl)}
                          className="flex items-center justify-center px-4 py-3 bg-white/5 hover:bg-[#CCFF00] hover:text-black text-[10px] font-black uppercase tracking-widest transition-colors border border-white/10 self-start sm:self-center w-full sm:w-auto"
                        >
                          <PlayCircle className="w-4 h-4 mr-2" /> Watch Form
                        </button>
                      </li>
                    );
                  })}
                </ul>
             </motion.div>
          </div>

          <div className="lg:col-span-1">
             <div className="sticky top-24">
               {activeVideo ? (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="bg-[#1A1A1A] border border-[#CCFF00]"
                 >
                   <div className="p-4 bg-[#CCFF00] flex justify-between items-center text-black">
                      <span className="font-black text-[10px] uppercase tracking-widest">Trainer Video</span>
                      <button onClick={() => setActiveVideo(null)} className="text-black/60 hover:text-black text-[10px] font-black uppercase tracking-widest">Close [X]</button>
                   </div>
                   <div className="aspect-video">
                     <iframe 
                       className="w-full h-full"
                       src={activeVideo} 
                       title="YouTube video player" 
                       frameBorder="0" 
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                       allowFullScreen
                     ></iframe>
                   </div>
                 </motion.div>
               ) : (
                 <div className="bg-[#1A1A1A] p-8 border border-white/10 border-dashed flex flex-col items-center justify-center text-center h-[300px]">
                    <PlayCircle className="w-16 h-16 text-white/10 mb-6" />
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 max-w-[200px] leading-relaxed">Select 'Watch Form' on any exercise to view the trainer's tutorial.</p>
                 </div>
               )}
             </div>
          </div>
       </div>
    </div>
  );
}
