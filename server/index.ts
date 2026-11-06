import "dotenv/config";
import express from "express";
import cors from "cors";
import aiRouter from "./routes/ai";

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({
    status: "FitTrack API running",
  });
});

app.use("/api/ai", aiRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
