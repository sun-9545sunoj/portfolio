document.addEventListener("DOMContentLoaded", () => {

    const chatToggle = document.getElementById("chatToggle");
    const chatWindow = document.getElementById("chatWindow");
    const chatCloseBtn = document.getElementById("chatCloseBtn");
    const chatInput = document.getElementById("chatInput");
    const sendBtn = document.getElementById("sendBtn");
    const chatMessages = document.getElementById("chatMessages");
    const typingIndicator = document.getElementById("typingIndicator");

    // ==========================================
    // GEMINI API CONFIGURATION
    // ==========================================
    // WARNING: For a static site (GitHub Pages), hardcoding an API key is insecure. 
    // Anyone can view the source code and steal the key. 
    // Best Practice: Deploy a small serverless function (Vercel/Cloudflare Workers) 
    // that holds the key and forwards the request to Gemini. 
    // For local testing, you can paste your key here:
    const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"; 
    
    // Fallback static knowledge base
    const knowledgeBase = {
        "research": "Sunoj focuses on Quantitative Finance, Deep Learning, and MLOps, with strong interests in Limit Order Book forecasting and high-frequency trading.",
        "quant": "Sunoj explores Financial Machine Learning, Market Microstructure, and Algorithmic Trading Systems.",
        "projects": "Major projects include a High-Frequency LOB Prediction framework and a Financial Risk Analysis & Surveillance Pipeline.",
        "tech": "Tech stack includes Python, C++, PyTorch, Scikit-learn, XGBoost, Docker, Kubernetes, GCP, and CUDA/HIP.",
        "open source": "Sunoj has contributed to Google's QuantumLib/qsim for GPU systems and Apache SeaTunnel for distributed data pipelines.",
        "experience": "Sunoj is pursuing B.Tech in CSE at IIIT Kottayam (Expected 2027) and is a Google Student Ambassador 2026."
    };

    // -------------------------------
    // Toggle chatbot
    // -------------------------------
    chatToggle.onclick = () => {
        chatWindow.classList.toggle("active");
    };

    chatCloseBtn.onclick = () => {
        chatWindow.classList.remove("active");
    };

    function getStaticResponse(q) {
        q = q.toLowerCase();
        for (const key in knowledgeBase) {
            if (q.includes(key)) return knowledgeBase[key];
        }
        if (q.includes("hi") || q.includes("hello")) {
            return "Hello 👋 Ask me about Sunoj’s quant research, projects, or tech stack.";
        }
        if (q.includes("who")) {
            return "Sunoj is an AI/ML Engineer with strong interests in Quantitative Finance, Deep Learning, and MLOps.";
        }
        return "I'm currently running in static mode. Ask about 'projects', 'tech', 'quant', or 'research'!";
    }

    async function fetchGeminiResponse(userMessage) {
        if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_GEMINI_API_KEY") {
            return getStaticResponse(userMessage);
        }

        const prompt = `You are an AI assistant for Sunoj Ragiri's portfolio website. 
Sunoj is an AI/ML Engineer interested in Quantitative Finance, Deep Learning, and MLOps.
Answer the user's question concisely and professionally based on his profile.
User question: ${userMessage}`;

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            });

            const data = await response.json();
            if (data.candidates && data.candidates.length > 0) {
                return data.candidates[0].content.parts[0].text;
            } else {
                throw new Error("Invalid response from Gemini");
            }
        } catch (error) {
            console.error("Gemini API Error:", error);
            return "Oops, I'm having trouble connecting to my brain. But here's what I know: " + getStaticResponse(userMessage);
        }
    }

    // -------------------------------
    // Chat logic
    // -------------------------------
    function addMessage(text, isUser = false) {
        const msgDiv = document.createElement("div");
        msgDiv.className = "message";
        
        if (isUser) {
            msgDiv.classList.add("user-message");
            msgDiv.innerHTML = `<div class="message-bubble">${text}</div>`;
        } else {
            msgDiv.innerHTML = `
                <div class="message-avatar">🤖</div>
                <div class="message-bubble">${text}</div>
            `;
        }
        
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function handleSend() {
        const text = chatInput.value.trim();
        if (!text) return;

        addMessage(text, true);
        chatInput.value = "";
        
        typingIndicator.style.display = "flex";
        
        const response = await fetchGeminiResponse(text);
        
        typingIndicator.style.display = "none";
        addMessage(response, false);
    }

    sendBtn.onclick = handleSend;
    chatInput.onkeypress = (e) => {
        if (e.key === "Enter") handleSend();
    };

});
