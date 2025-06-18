require("dotenv").config();

const express = require("express");
const multer = require("multer");
const fs = require("fs");
const app = express();
const port = 3000;

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });
const upload = multer({ dest: "uploads/" });

const handleGeneration = async (req, res, type = "file") => {
  if (!req.file) {
    return res.status(400).json({ error: `No ${type} uploaded` });
  }
  const prompt = req.body.prompt || `Please analyze this ${type}`;
  const filePath = req.file.path;
  const mimeType = req.file.mimetype;
  try {
    const base64 = fs.readFileSync(filePath).toString("base64");
    const filePart = {
      inlineData: {
        data: base64,
        mimeType,
      },
    };
    const result = await model.generateContent([{ text: prompt }, filePart]);
    const response = result.response;
    res.status(200).json({ output: response.text() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (err) {
      console.error(err);
    }
  }
};

app.use(express.json());

app.post("/generate-text", async (req, res) => {
  const prompt = req.body.prompt;
  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    res.status(200).json({ output: response.text() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/generate-from-image", upload.single("image"), (req, res) =>
  handleGeneration(req, res, "image")
);

app.post("/generate-from-document", upload.single("document"), (req, res) =>
  handleGeneration(req, res, "document")
);

app.post("/generate-from-audio", upload.single("audio"), (req, res) =>
  handleGeneration(req, res, "audio")
);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
