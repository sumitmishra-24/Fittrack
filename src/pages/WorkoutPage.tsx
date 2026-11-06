import { useState } from "react";
import { workoutPlan } from "../store/data";
import { motion } from "motion/react";
import {
  PlayCircle,
  Sparkles,
  Dumbbell,
  Loader2,
  CheckCircle2,
  Circle,
  Clock,
  CalendarDays,
} from "lucide-react";
import { cn } from "../lib/utils";

type WorkoutInput = {
  goal: string;
  experience: string;
  daysPerWeek: number;
  equipment: string[];
  duration: number;
  limitations: string;
};

type Exercise = {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  instructions: string;
};

type WorkoutDay = {
  day: string;
  focus: string;
  exercises: Exercise[];
};

type GeneratedWorkout = {
  title: string;
  goal: string;
  summary: string;
  weeklySchedule: WorkoutDay[];
  tips: string[];
};

export default function WorkoutPage() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(
    new Set(),
  );
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const [form, setForm] = useState<WorkoutInput>({
    goal: "Muscle Gain",
    experience: "Beginner",
    daysPerWeek: 4,
    equipment: ["Dumbbells", "Bodyweight"],
    duration: 45,
    limitations: "",
  });

  const [generatedPlan, setGeneratedPlan] = useState<GeneratedWorkout | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedGeneratedDay, setSelectedGeneratedDay] = useState(0);
  const [completedGeneratedExercises, setCompletedGeneratedExercises] =
    useState<Set<string>>(new Set());

  const toggleExercise = (name: string) => {
    setCompletedExercises((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(name)) {
        newSet.delete(name);
      } else {
        newSet.add(name);
      }
      return newSet;
    });
  };

  const toggleGeneratedExercise = (name: string) => {
    setCompletedGeneratedExercises((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(name)) {
        newSet.delete(name);
      } else {
        newSet.add(name);
      }
      return newSet;
    });
  };

  const toggleEquipment = (item: string) => {
    setForm((prev) => ({
      ...prev,
      equipment: prev.equipment.includes(item)
        ? prev.equipment.filter((e) => e !== item)
        : [...prev.equipment, item],
    }));
  };

  const generateWorkout = async () => {
    setLoading(true);
    setError("");
    setGeneratedPlan(null);
    setCompletedGeneratedExercises(new Set());
    setSelectedGeneratedDay(0);

    try {
      const response = await fetch("/api/ai/workout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: form,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to generate workout.");
      }

      if (!result.result) {
        throw new Error("AI returned an empty response.");
      }

      let parsedPlan: GeneratedWorkout;

      try {
        const cleaned = result.result
          .replace(/```json/gi, "")
          .replace(/```/g, "")
          .trim();

        parsedPlan = JSON.parse(cleaned);
      } catch {
        throw new Error(
          "AI returned an invalid workout format. Please generate again.",
        );
      }

      if (
        !parsedPlan.weeklySchedule ||
        !Array.isArray(parsedPlan.weeklySchedule) ||
        parsedPlan.weeklySchedule.length === 0
      ) {
        throw new Error("The generated workout plan is incomplete.");
      }

      setGeneratedPlan(parsedPlan);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const currentWorkout = workoutPlan[selectedDay];

  const activeGeneratedDay =
    generatedPlan?.weeklySchedule[selectedGeneratedDay];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-white font-sans">
      <div className="mb-8 border-b border-white/10 pb-6">
        <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-2">
          Your Workout Plan
        </h1>
        <p className="text-[10px] font-bold tracking-widest uppercase opacity-60">
          Track your sets, reps, and watch instructional videos from certified
          trainers.
        </p>
      </div>

      {/* AI Workout Generator */}
      <section className="bg-[#1A1A1A] border border-[#CCFF00]/30 p-6 sm:p-8 mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-[#CCFF00] flex items-center justify-center">
            <Sparkles className="text-black" />
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase">
              AI Workout Generator
            </h2>
            <p className="text-[10px] uppercase tracking-widest text-white/50">
              Build your personalized training plan
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest mb-3">
              Fitness Goal
            </label>
            <select
              value={form.goal}
              onChange={(e) => setForm({ ...form, goal: e.target.value })}
              className="w-full bg-black border border-white/10 p-4 text-sm outline-none focus:border-[#CCFF00]"
            >
              <option>Muscle Gain</option>
              <option>Fat Loss</option>
              <option>Strength</option>
              <option>General Fitness</option>
              <option>Endurance</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest mb-3">
              Experience Level
            </label>
            <select
              value={form.experience}
              onChange={(e) => setForm({ ...form, experience: e.target.value })}
              className="w-full bg-black border border-white/10 p-4 text-sm outline-none focus:border-[#CCFF00]"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest mb-3">
              Training Days Per Week
            </label>
            <select
              value={form.daysPerWeek}
              onChange={(e) =>
                setForm({
                  ...form,
                  daysPerWeek: Number(e.target.value),
                })
              }
              className="w-full bg-black border border-white/10 p-4 text-sm outline-none focus:border-[#CCFF00]"
            >
              {[2, 3, 4, 5, 6].map((day) => (
                <option key={day} value={day}>
                  {day} Days
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest mb-3">
              Session Duration
            </label>
            <select
              value={form.duration}
              onChange={(e) =>
                setForm({
                  ...form,
                  duration: Number(e.target.value),
                })
              }
              className="w-full bg-black border border-white/10 p-4 text-sm outline-none focus:border-[#CCFF00]"
            >
              <option value={30}>30 Minutes</option>
              <option value={45}>45 Minutes</option>
              <option value={60}>60 Minutes</option>
              <option value={90}>90 Minutes</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-[10px] font-black uppercase tracking-widest mb-3">
            Available Equipment
          </label>
          <div className="flex flex-wrap gap-3">
            {[
              "Dumbbells",
              "Barbell",
              "Resistance Bands",
              "Gym Machines",
              "Bodyweight",
            ].map((item) => {
              const selected = form.equipment.includes(item);

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleEquipment(item)}
                  className={cn(
                    "px-4 py-3 text-[10px] font-bold uppercase tracking-widest border transition-colors",
                    selected
                      ? "bg-[#CCFF00] text-black border-[#CCFF00]"
                      : "bg-black border-white/10 text-white/60 hover:border-[#CCFF00]",
                  )}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-[10px] font-black uppercase tracking-widest mb-3">
            Limitations / Additional Information
          </label>
          <textarea
            value={form.limitations}
            onChange={(e) => setForm({ ...form, limitations: e.target.value })}
            placeholder="Example: Home workout, no bench, avoid heavy squats..."
            rows={3}
            className="w-full bg-black border border-white/10 p-4 text-sm outline-none focus:border-[#CCFF00] resize-none"
          />
        </div>

        <button
          onClick={generateWorkout}
          disabled={loading || form.equipment.length === 0}
          className="mt-6 w-full sm:w-auto px-8 py-4 bg-[#CCFF00] text-black font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating Plan...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generate My Workout
            </>
          )}
        </button>

        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
      </section>

      {/* Generated Workout Display */}
      {generatedPlan && activeGeneratedDay && (
        <section className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-[#CCFF00] mb-2">
                <Sparkles size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  AI Generated Plan
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black uppercase">
                {generatedPlan.title}
              </h2>
              <p className="text-sm text-white/50 mt-2">
                {generatedPlan.summary}
              </p>
            </div>

            <div className="bg-[#1A1A1A] border border-white/10 p-4 min-w-36">
              <p className="text-[10px] text-white/40 uppercase tracking-widest">
                Your Goal
              </p>
              <p className="font-black text-[#CCFF00] mt-1">
                {generatedPlan.goal}
              </p>
            </div>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-4 mb-6">
            {generatedPlan.weeklySchedule.map((day, index) => (
              <button
                key={`${day.day}-${index}`}
                onClick={() => setSelectedGeneratedDay(index)}
                className={cn(
                  "min-w-32 px-5 py-4 text-left border transition-colors",
                  selectedGeneratedDay === index
                    ? "bg-[#CCFF00] text-black border-[#CCFF00]"
                    : "bg-[#1A1A1A] border-white/10 text-white hover:border-[#CCFF00]",
                )}
              >
                <span className="block text-[10px] font-black uppercase tracking-widest opacity-60">
                  {day.day}
                </span>
                <span className="block text-xs font-black uppercase mt-2">
                  {day.focus}
                </span>
              </button>
            ))}
          </div>

          <motion.div
            key={selectedGeneratedDay}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1A1A1A] border-l-4 border-[#CCFF00]"
          >
            <div className="p-6 border-b border-white/10 flex flex-wrap justify-between items-center gap-3">
              <div>
                <p className="text-[10px] text-[#CCFF00] font-black uppercase tracking-widest">
                  {activeGeneratedDay.day}
                </p>
                <h3 className="text-2xl font-black uppercase mt-1">
                  {activeGeneratedDay.focus}
                </h3>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-white/50">
                {activeGeneratedDay.exercises.length} Exercises
              </span>
            </div>

            <div className="divide-y divide-white/10">
              {activeGeneratedDay.exercises.map((exercise, index) => {
                const exerciseId = `${selectedGeneratedDay}-${index}-${exercise.name}`;
                const isCompleted = completedGeneratedExercises.has(exerciseId);

                return (
                  <div
                    key={exerciseId}
                    className={cn(
                      "p-5 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-start",
                      isCompleted && "bg-[#CCFF00]/5",
                    )}
                  >
                    <button
                      onClick={() => toggleGeneratedExercise(exerciseId)}
                      className="mt-1 flex-shrink-0"
                      aria-label="Toggle exercise completion"
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="text-[#CCFF00]" size={24} />
                      ) : (
                        <Circle className="text-white/30" size={24} />
                      )}
                    </button>

                    <div className="flex-1">
                      <h4
                        className={cn(
                          "text-xl font-black uppercase",
                          isCompleted && "line-through text-white/40",
                        )}
                      >
                        {exercise.name}
                      </h4>

                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="bg-white/10 px-3 py-2 text-[10px] font-bold uppercase">
                          {exercise.sets} Sets
                        </span>
                        <span className="bg-white/10 px-3 py-2 text-[10px] font-bold uppercase">
                          {exercise.reps} Reps
                        </span>
                        <span className="bg-white/10 px-3 py-2 text-[10px] font-bold uppercase flex items-center gap-1">
                          <Clock size={12} />
                          Rest: {exercise.rest}
                        </span>
                      </div>

                      <p className="text-sm text-white/50 leading-relaxed mt-4">
                        {exercise.instructions}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {generatedPlan.tips?.length > 0 && (
            <div className="mt-6 bg-[#1A1A1A] border border-white/10 p-6">
              <h3 className="font-black uppercase tracking-widest mb-4 text-[#CCFF00]">
                Coach's Tips
              </h3>
              <ul className="space-y-3">
                {generatedPlan.tips.map((tip, index) => (
                  <li key={index} className="text-sm text-white/60 flex gap-3">
                    <span className="text-[#CCFF00]">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* Existing Workout Tracker */}
      <div className="mb-6 flex items-center gap-3">
        <Dumbbell className="text-[#CCFF00]" />
        <h2 className="text-xl font-black uppercase">
          Your Existing Workout Schedule
        </h2>
      </div>

      <div className="flex space-x-4 overflow-x-auto pb-4 mb-6">
        {workoutPlan.map((plan, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedDay(idx)}
            className={cn(
              "px-6 py-4 text-[10px] font-black uppercase tracking-widest transition-colors whitespace-nowrap",
              selectedDay === idx
                ? "bg-[#CCFF00] text-black"
                : "bg-[#1A1A1A] text-white hover:bg-white/10 border border-white/10",
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
              <h2 className="text-3xl font-black uppercase text-white leading-none">
                {currentWorkout.focus}
              </h2>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#CCFF00] whitespace-nowrap">
                {currentWorkout.exercises.length} Exercises
              </span>
            </div>

            <ul>
              {currentWorkout.exercises.map((exercise) => {
                const isCompleted = completedExercises.has(exercise.name);

                return (
                  <li
                    key={exercise.name}
                    className={cn(
                      "p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/10 hover:bg-white/5 transition-colors",
                      isCompleted ? "bg-[#CCFF00]/5" : "",
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <button
                        onClick={() => toggleExercise(exercise.name)}
                        className="mt-1 flex-shrink-0 focus:outline-none"
                      >
                        {isCompleted ? (
                          <div className="w-6 h-6 bg-[#CCFF00] flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-black" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 border-2 border-white/30 hover:border-[#CCFF00] transition-colors" />
                        )}
                      </button>

                      <div>
                        <h3
                          className={cn(
                            "text-2xl font-black uppercase transition-all mb-2",
                            isCompleted
                              ? "text-white/40 line-through"
                              : "text-white",
                          )}
                        >
                          {exercise.name}
                        </h3>

                        <div className="flex flex-wrap gap-3">
                          <span className="bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                            {exercise.sets} Sets
                          </span>
                          <span className="bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                            {exercise.reps} Reps
                          </span>
                          <span className="bg-transparent border border-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest opacity-60">
                            Rest: {exercise.rest}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveVideo(exercise.videoUrl)}
                      className="flex items-center justify-center px-4 py-3 bg-white/5 hover:bg-[#CCFF00] hover:text-black text-[10px] font-black uppercase tracking-widest transition-colors border border-white/10 self-start sm:self-center w-full sm:w-auto"
                    >
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Watch Form
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
                  <span className="font-black text-[10px] uppercase tracking-widest">
                    Trainer Video
                  </span>
                  <button
                    onClick={() => setActiveVideo(null)}
                    className="text-black/60 hover:text-black text-[10px] font-black uppercase tracking-widest"
                  >
                    Close [X]
                  </button>
                </div>

                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={activeVideo}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </motion.div>
            ) : (
              <div className="bg-[#1A1A1A] p-8 border border-white/10 border-dashed flex flex-col items-center justify-center text-center h-[300px]">
                <PlayCircle className="w-16 h-16 text-white/10 mb-6" />
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 max-w-[200px] leading-relaxed">
                  Select 'Watch Form' on any exercise to view the trainer's
                  tutorial.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
