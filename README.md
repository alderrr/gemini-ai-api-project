# Gemini AI Content Generator API

This is a Node.js-based API server that leverages Google's Gemini 1.5 Flash model to generate content from text prompts, images, documents, and audio files. It uses Express for routing and Multer for handling file uploads.

## Features

- **Text Generation** — Generate text from a prompt.
- **Image Analysis** — Send an image and receive a description or analysis.
- **Document Processing** — Upload documents (e.g., PDF, DOCX) for analysis.
- **Audio Interpretation** — Send audio files for transcription or insights.

## Endpoints

### `POST /generate-text`
Generate content from a raw text prompt.

**Body (JSON):**
```json
{
  "prompt": "Describe the impact of AI on modern society."
}
```

### `POST /generate-from-image`
Upload an image and receive a generated response based on the prompt.

**Form-Data:**
- `prompt`: (string, optional)
- `image`: (file) PNG, JPEG, etc.

### `POST /generate-from-document`
Upload a document for Gemini to analyze.

**Form-Data:**
- `prompt`: (string, optional)
- `document`: (file) PDF, DOCX, etc.

### `POST /generate-from-audio`
Upload an audio file for transcription or analysis.

**Form-Data:**
- `prompt`: (string, optional)
- `audio`: (file) MP3, WAV, etc.

## Setup

1. Clone the repository:
```bash
git clone https://github.com/alderrr/gemini-ai-api-project.git
cd gemini-ai-api-project/1.5-gemini-flash
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file and add your Google API key:
```
GOOGLE_API_KEY=your_google_api_key
```

4. Start the server:
```bash
node index.js
```

## Notes

- Uploaded files are automatically deleted after processing.
- Make sure your Google API key has access to Gemini models.

## License

This project is licensed under the MIT License.
