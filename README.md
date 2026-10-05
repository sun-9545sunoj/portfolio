# Sunoj Ragiri | Personal Portfolio

A professional, high-performance portfolio website built for an **AI/ML Engineer** with a strong focus on **Quantitative Finance, Deep Learning, and MLOps**. 

This repository contains the static frontend codebase designed to be lightweight, responsive, and easily deployable via Vercel or GitHub Pages.

## 🚀 Features
* **Modern & Responsive UI:** Clean, dark-themed bento-box grid design.
* **LLM Chatbot Integration:** Built-in AI assistant interface ready to be hooked up to the Gemini API via serverless functions.
* **Automated GitHub Activity:** Uses GitHub Actions to fetch live repository and follower stats dynamically without hitting client-side rate limits.
* **Serverless Contact Form:** Pre-configured for Formspree/Web3Forms integration.

## 🛠️ Tech Stack
* **Frontend:** HTML5, CSS3 (Custom Variables, Grid/Flexbox), Vanilla JavaScript
* **CI/CD Pipeline:** GitHub Actions (Python script for fetching stats)
* **Design Pattern:** Bento Grid Architecture

## 📂 Project Structure
```text
.
├── .github/workflows/   # CI/CD pipelines (GitHub Actions)
├── frontend/            # Main source code directory
│   ├── assets/          # Static assets (CV, dynamic JSON data)
│   ├── css/             # Stylesheets
│   ├── js/              # Client-side logic (Chatbot, Analytics, UI interactions)
│   └── index.html       # Main application entry point
├── README.md            
└── docker-compose.yml   # Optional containerization for local development
```

## ⚙️ Local Development
No build tools are required! You can serve this project instantly:

1. Clone the repository:
   ```bash
   git clone https://github.com/sun-9545sunoj/portfolio.git
   ```
2. Navigate to the frontend directory:
   ```bash
   cd portfolio/frontend
   ```
3. Start a local Python server:
   ```bash
   python3 -m http.server 3000
   ```
4. Open `http://localhost:3000` in your browser.

## ☁️ Deployment (Vercel)
This project is optimized for 1-click deployment on Vercel:
1. Import the repository in the Vercel dashboard.
2. Change the **Root Directory** to `frontend`.
3. Click **Deploy**.

## 🤖 Gemini API Note
To keep your API keys secure, the frontend `chatbot.js` is currently configured with a static fallback. To use the live Gemini API in production, wrap your API key in a Vercel Serverless Function (`api/chat.js`) to act as a secure proxy.
