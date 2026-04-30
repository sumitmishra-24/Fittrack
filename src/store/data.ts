export type User = {
  name: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  goal: string;
  bodyType: string;
  activityLevel: string;
  dietPreference: string;
  equipment: string;
  streak: number;
};

export const mockUser: User = {
  name: "Rahul Sharma",
  age: 21,
  gender: "Male",
  height: 170,
  weight: 65,
  goal: "Muscle Gain",
  bodyType: "Athletic",
  activityLevel: "Intermediate",
  dietPreference: "Vegetarian",
  equipment: "Dumbbells",
  streak: 7,
};

export const reviews = [
  {
    author: "Aman Verma",
    rating: 5,
    text: "FitTrack completely changed my fitness routine. I lost 5 kg in 2 months!",
  },
  {
    author: "Neha Gupta",
    rating: 4,
    text: "Very helpful app for beginners. Simple and effective.",
  },
  {
    author: "Rohan Singh",
    rating: 5,
    text: "The diet plans are easy to follow and affordable.",
  },
];

export const contactInfo = {
  email: "support@fittrack.com",
  phone: "+91 98765 43210",
  address: "Sector 62, Noida, Uttar Pradesh, India",
};

export const dailyTasks = [
  { id: 1, title: "Complete 30-minute workout", completed: false },
  { id: 2, title: "Drink 3 liters of water", completed: true },
  { id: 3, title: "Walk 8,000 steps", completed: false },
  { id: 4, title: "Complete protein intake", completed: true },
];

export const workoutPlan = [
  {
    day: "Day 1",
    focus: "Chest + Triceps",
    exercises: [
      { name: "Push-ups", sets: 3, reps: 15, rest: "60s", videoUrl: "https://www.youtube.com/embed/IODxDxX7oi4" },
      { name: "Dumbbell Bench Press", sets: 3, reps: 12, rest: "90s", videoUrl: "https://www.youtube.com/embed/VmB1G1K7v94" },
      { name: "Tricep Dips", sets: 3, reps: 12, rest: "60s", videoUrl: "https://www.youtube.com/embed/0326dy_-CzM" },
    ]
  },
  {
    day: "Day 2",
    focus: "Back + Biceps",
    exercises: [
      { name: "Pull-ups", sets: 3, reps: 8, rest: "90s", videoUrl: "https://www.youtube.com/embed/eGo4IYtlbpU" },
      { name: "Dumbbell Rows", sets: 3, reps: 12, rest: "60s", videoUrl: "https://www.youtube.com/embed/roCP6wCLLZA" },
      { name: "Dumbbell Curls", sets: 3, reps: 12, rest: "60s", videoUrl: "https://www.youtube.com/embed/ykJmrZ5v0Oo" },
    ]
  },
  {
    day: "Day 3",
    focus: "Legs + Shoulders",
    exercises: [
      { name: "Squats", sets: 4, reps: 15, rest: "90s", videoUrl: "https://www.youtube.com/embed/gcNh17Ckjgg" },
      { name: "Lunges", sets: 3, reps: 12, rest: "60s", videoUrl: "https://www.youtube.com/embed/QOVaHwm-Q6U" },
      { name: "Overhead Press", sets: 3, reps: 10, rest: "90s", videoUrl: "https://www.youtube.com/embed/QAQ64hK4Xxs" },
    ]
  }
];

export const dietPlan = {
  goal: "Muscle Gain",
  calories: 2500,
  protein: "120g",
  meals: [
    { type: "Breakfast", items: "Oats + Milk + Banana" },
    { type: "Lunch", items: "Rice + Dal + Paneer" },
    { type: "Dinner", items: "Roti + Vegetables + Curd" },
    { type: "Snacks", items: "Fruits + Nuts" },
  ]
};

export const progressData = [
  { date: "2026-04-24", weight: 65.5, caloriesConsumed: 2600, caloriesBurned: 400 },
  { date: "2026-04-25", weight: 65.3, caloriesConsumed: 2500, caloriesBurned: 450 },
  { date: "2026-04-26", weight: 65.2, caloriesConsumed: 2450, caloriesBurned: 500 },
  { date: "2026-04-27", weight: 65.0, caloriesConsumed: 2550, caloriesBurned: 350 },
  { date: "2026-04-28", weight: 64.8, caloriesConsumed: 2500, caloriesBurned: 600 },
  { date: "2026-04-29", weight: 64.6, caloriesConsumed: 2480, caloriesBurned: 550 },
  { date: "2026-04-30", weight: 64.5, caloriesConsumed: 2200, caloriesBurned: 500 },
];

export const aiSuggestions = [
  "You missed 2 workouts this week. Try to stay consistent!",
  "Increase protein intake for better results in muscle gain.",
  "Great job maintaining your 7-day streak! 🔥"
];
