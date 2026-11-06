import { Router, type Request, type Response } from "express";
import { GoogleGenAI } from "@google/genai";

const router = Router();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing in .env");
}

const ai = new GoogleGenAI({ apiKey });

const prompts: Record<string, string> = {
  chatbot: `
    You are FitTrack AI, a helpful fitness assistant.
    Answer questions about workouts, nutrition and fitness.
    Give simple, practical and safe advice.
    Never diagnose medical conditions.
  `,

  workout: `
You are FitTrack AI, an expert certified fitness coach.

Generate a personalized weekly workout plan based on the user's provided data.

Return ONLY valid JSON. Do not use Markdown code fences or extra text.

Use this exact JSON structure:

{
  "title": "Personalized Workout Plan",
  "goal": "User's fitness goal",
  "summary": "Short description of the plan",
  "weeklySchedule": [
    {
      "day": "Day 1",
      "focus": "Chest and Triceps",
      "exercises": [
        {
          "name": "Push Ups",
          "sets": 3,
          "reps": "12-15",
          "rest": "60 seconds",
          "instructions": "Keep your body straight while performing the movement."
        }
      ]
    }
  ],
  "tips": [
    "Warm up before every workout.",
    "Maintain proper exercise form."
  ]
}

IMPORTANT RULES:
- Follow the user's experience level, equipment, available days and session duration.
- Generate exactly the requested number of training days.
- Include appropriate rest and recovery days in the schedule.
- Never recommend equipment the user does not have.
- Use realistic sets, reps and rest periods.
- Include beginner-friendly alternatives where appropriate.
- Never recommend training through pain or injury.
- Do not invent medical advice.
- Ensure the JSON is valid and complete.
`,

  diet: `
    You are an expert nutrition assistant.
    Generate practical diet plans.
    Include meals, estimated calories and protein.
  `,

  progress: `
    You are a fitness progress analyst.
    Analyze supplied fitness data.
    Identify trends and give practical recommendations.
    Never invent missing data or diagnose diseases.
  `,
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

router.post("/:feature", async (req: Request, res: Response) => {
  try {
    const { feature } = req.params;
    const { message, data } = req.body;

    if (!prompts[feature]) {
      return res.status(400).json({
        error: "Invalid AI feature",
      });
    }

    if (
      feature === "chatbot" &&
      (typeof message !== "string" || !message.trim())
    ) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const userInput =
      feature === "chatbot"
        ? message.slice(0, 2000)
        : JSON.stringify(data || {}).slice(0, 5000);

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash-lite",
          contents: userInput,
          config: {
            systemInstruction: prompts[feature],
          },
        });

        return res.json({
          result: response.text,
        });
      } catch (error) {
        const status = (error as { status?: number }).status;

        console.error(`AI attempt ${attempt} failed:`, error);

        if ((status === 503 || status === 429) && attempt < 3) {
          await wait(attempt * 2000);
          continue;
        }

        if (status === 503 || status === 429) {
          return res.status(503).json({
            error: "AI service is busy. Please try again later.",
          });
        }

        return res.status(500).json({
          error: "AI generation failed.",
        });
      }
    }
  } catch (error) {
    console.error("Server error:", error);

    return res.status(500).json({
      error: "Internal server error.",
    });
  }
});

export default router;
