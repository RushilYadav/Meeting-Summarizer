import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

// Load environment variables at the very top
dotenv.config();

//console.log("OpenAI key:", process.env.OPENAI_API_KEY);


const app = express();
app.use(cors());
app.use(express.json());

// Initialize OpenAI client with API key from .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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

    // Example: parse tasks separately if needed
    const tasks = [
      { id: 1, text: "Example task from AI", date: "2025-08-30", selected: false },
      { id: 2, text: "Follow up with client", date: "2025-09-01", selected: false },
    ];

    res.json({ summary: output, tasks });
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
