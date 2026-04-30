import { Link } from "react-router-dom";
import { ArrowRight, Star, CheckCircle, Smartphone, Activity } from "lucide-react";
import { reviews, contactInfo } from "../store/data";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-[#0A0A0A] py-20 lg:py-32 overflow-hidden border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
              <motion.div 
                className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-7 xl:col-span-6 lg:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-5xl md:text-7xl font-sans italic tracking-tighter uppercase leading-none font-black text-white">
                  <span className="block">Your personal</span>
                  <span className="block text-[#CCFF00]">AI Fitness Coach</span>
                </h1>
                <p className="mt-6 text-xs md:text-sm font-bold opacity-60 tracking-widest uppercase text-white sm:mt-8 sm:max-w-xl sm:mx-auto md:max-w-2xl lg:mx-0 leading-relaxed">
                  FitTrack helps you achieve your health and fitness goals through personalized workout plans, diet recommendations, and smart progress tracking.
                </p>
                <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0 flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/auth"
                    className="inline-flex items-center justify-center px-8 py-4 text-[10px] sm:text-xs font-black uppercase tracking-widest text-black bg-[#CCFF00] hover:bg-white transition-colors"
                  >
                    Get Started
                    <ArrowRight className="ml-3 w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
              <motion.div 
                className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-5 xl:col-span-6 lg:flex lg:items-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="relative mx-auto w-full lg:max-w-md bg-[#1A1A1A] p-8 border-l-4 border-[#CCFF00] flex flex-col items-center justify-center aspect-square hidden sm:flex">
                   <Activity className="w-32 h-32 text-[#CCFF00] mb-8" />
                   <div className="w-full bg-white/10 h-2 mb-4">
                     <div className="bg-[#CCFF00] h-full" style={{ width: '70%' }}></div>
                   </div>
                   <p className="text-[10px] text-[#CCFF00] font-black uppercase tracking-widest">Daily Goal Progress</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-[#0A0A0A] overflow-hidden lg:py-24 border-b border-white/10">
          <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
            <div className="relative text-center">
              <span className="text-[10px] text-[#CCFF00] font-black tracking-widest uppercase border border-[#CCFF00] px-3 py-1 inline-block mb-4">Features</span>
              <p className="mt-4 text-4xl leading-none font-black italic tracking-tighter uppercase text-white sm:text-5xl">
                Everything you need
              </p>
            </div>

            <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
              <div className="relative">
                <dl className="space-y-12">
                  {[
                    { title: "Smart Workout Planner", desc: "Automatically generates daily workout routines tailored to your goals." },
                    { title: "Personalized Diet", desc: "Get meal plans that respect your dietary preferences while hitting your macros." },
                    { title: "Progress Tracking", desc: "Visualize your weight, calories, and body measurements over time." },
                    { title: "Daily Habit Building", desc: "Maintain daily streaks with our interactive task assignment system." }
                  ].map((feature, idx) => (
                    <motion.div 
                      key={feature.title} 
                      className="relative"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <dt>
                        <div className="absolute flex items-center justify-center h-12 w-12 bg-[#CCFF00] text-black border border-[#CCFF00]">
                          <CheckCircle className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <p className="ml-16 text-xl tracking-tight uppercase font-black text-white">{feature.title}</p>
                      </dt>
                      <dd className="mt-3 ml-16 text-xs font-bold opacity-60 uppercase tracking-widest leading-relaxed text-white">{feature.desc}</dd>
                    </motion.div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="bg-[#1A1A1A] py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl font-black italic uppercase tracking-tighter text-white mb-16">Loved by our users</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review, i) => (
                <motion.div 
                  key={i} 
                  className="bg-[#0A0A0A] p-8 border-l-4 border-[#CCFF00] text-left flex flex-col justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div>
                    <div className="flex items-center mb-6">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className={cn("w-5 h-5", j < review.rating ? "text-[#CCFF00] fill-[#CCFF00]" : "text-white/20")} />
                      ))}
                    </div>
                    <p className="text-sm font-bold uppercase tracking-wider text-white opacity-80 mb-8 leading-relaxed">"{review.text}"</p>
                  </div>
                  <p className="text-[10px] text-[#CCFF00] font-black uppercase tracking-widest">USER / {review.author}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-3xl font-black italic uppercase tracking-tighter text-[#CCFF00] mb-4 flex items-center gap-2">
                  <Activity className="w-8 h-8" />
                  FitTrack
                </h3>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 max-w-sm mt-4 leading-relaxed">Your reliable partner for building healthier habits and a better lifestyle.</p>
              </div>
              <div className="md:text-right">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-[#CCFF00] mb-4">Contact Information</h4>
                <p className="text-xs font-bold uppercase opacity-60 mb-2">{contactInfo.email}</p>
                <p className="text-xs font-bold uppercase opacity-60 mb-2">{contactInfo.phone}</p>
                <p className="text-xs font-bold uppercase opacity-60">{contactInfo.address}</p>
              </div>
           </div>
           <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-40">
             <div>&copy; {new Date().getFullYear()} FINTRACK INTEGRATED SYSTEMS</div>
             <div className="mt-4 sm:mt-0 text-[#CCFF00]">SYSTEM ONLINE</div>
           </div>
        </div>
      </footer>
    </div>
  );
}
