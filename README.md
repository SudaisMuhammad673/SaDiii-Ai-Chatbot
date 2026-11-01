# SaDiii AI Chatbot 2.0 ✦

A responsive AI chatbot built with HTML, CSS, JavaScript, a Vercel serverless backend, and the Google Gemini API.

## Features
- Responsive dark-themed chat interface
- Real Gemini AI responses
- Conversation context (recent messages)
- Suggested prompts and New Chat button
- API key stored securely as a Vercel environment variable

## Deploy on Vercel
1. Push this project to a GitHub repository.
2. Import that repository into Vercel.
3. In Vercel, open **Project Settings → Environment Variables**.
4. Add `GEMINI_API_KEY` and paste your Gemini API key as its value.
5. Select Production (and Preview if you want), then save.
6. Redeploy the project after adding the variable.

Vercel serves the frontend and `/api/chat` backend from the same deployment.

## Important security notes
- Never put your Gemini API key in `script.js`, `index.html`, or any public GitHub file.
- Never commit a `.env` file containing the key.
- The API key should exist only in Vercel Environment Variables.
- Monitor usage and set any available quotas or restrictions in Google AI Studio.

## Run locally
This project uses a Vercel serverless function, so opening `index.html` directly will not run the AI endpoint. For local testing, install the Vercel CLI and run `vercel dev` after setting `GEMINI_API_KEY` in your local environment.

## Built with
- HTML5
- CSS3
- Vanilla JavaScript
- Vercel Functions
- Google Gemini API

## Author
Muhammad Sudais
