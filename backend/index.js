import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import multer from "multer";
import fs from "fs";

// Load environment variables at the very top
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize OpenAI client with API key from .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log("Loaded OpenAI key:", process.env.OPENAI_API_KEY ? "Yes" : "No");

// Configure multer for audio uploads
const upload = multer({ dest: "uploads/" });

// POST /transcribe endpoint
app.post("/transcribe", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No audio file uploaded" });
    }

    const audioStream = fs.createReadStream(req.file.path);

    const transcription = await openai.audio.transcriptions.create({
      model: "whisper-1",
      file: audioStream,
    });

    fs.unlinkSync(req.file.path); // Clean up uploaded file

    res.json({ transcript: transcription.text });
  } catch (error) {
    console.error("Transcription error:", error);
    res.status(500).json({ error: "Audio transcription failed" });
  }
});

// POST /summarize endpoint
app.post("/summarize", async (req, res) => {
  const { transcript } = req.body;

  if (!transcript) {
    return res.status(400).json({ error: "No transcript provided" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // or "gpt-4" if available
      messages: [
        {
          role: "system",
          content: `
          You are an AI assistant that summarizes meeting transcripts.  

        Please output the meeting in the following JSON format ONLY:  

        {
        "attendees": ["Name1", "Name2", "..."],
        "summary": "Brief plain-language summary of the meeting.",
        "tasks": [
            {
            "text": "Task description",
            "date": "YYYY-MM-DD or null if no specific date",
            "assigned_to": ["Name1", "Name2"]
            }
        ]
        }

        Rules:
        1. Capture attendees mentioned at the start of the transcript.
        2. Summarize the meeting clearly and concisely.
        3. Extract tasks and key dates exactly as mentioned.
        4. Assign tasks to the correct person(s).
        5. If no date is given for a task, set "date": null.
        6. Only return JSON, do not add extra text.
          `,
        },
        { role: "user", content: transcript },
      ],
      max_tokens: 500,
    });

    const output = response.choices[0].message.content;

    //debug
    console.log("Raw output:", output);

    let parsedData;
    try {
      parsedData = JSON.parse(output);
    } catch (error) {
      console.error("Failed to parse AI JSON:", error);
      parsedData = { summary: output, tasks: []}; //fallback
    }

    // Convert tasks into frontend format

    const tasks = (parsedData.tasks || []).map((task, index) => ({
      id: index + 1,
      text: task.text,
      date: task.date || null,
      selected: false,
    }));

    res.json({
      summary: parsedData.summary || "",
      tasks,
      attendees: parsedData.attendees || [],
    })

  } catch (error) {
    console.error("OpenAI request error:", error);

    if (error.code === "insufficient_quota" || error.status === 429) {
      return res.status(429).json({
        error:
          "Quota exceeded or API key problem. Check your OpenAI account and API key.",
      });
    }

    res.status(500).json({ error: "AI request failed" });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));