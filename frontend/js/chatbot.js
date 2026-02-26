document.addEventListener("DOMContentLoaded", () => {

    const chatToggle = document.getElementById("chatToggle");
    const chatWindow = document.getElementById("chatWindow");
    const chatCloseBtn = document.getElementById("chatCloseBtn");
    const chatInput = document.getElementById("chatInput");
    const sendBtn = document.getElementById("sendBtn");
    const chatMessages = document.getElementById("chatMessages");
    const typingIndicator = document.getElementById("typingIndicator");

    // -------------------------------
    // Toggle chatbot
    // -------------------------------
    chatToggle.onclick = () => {
        chatWindow.classList.toggle("active");
    };

    chatCloseBtn.onclick = () => {
        chatWindow.classList.remove("active");
    };

    // -------------------------------
    // Knowledge base
    // -------------------------------
    const knowledgeBase = {
        "research":
            "Sunoj is a Research Assistant at IIIT Kottayam working on Quantum Machine Learning and hybrid quantum-classical systems.",

        "projects":
            "Projects include QLSTM-FOREX, Fake News Detection using Transformers, and Quantum Cryptography using BB84.",

        "tech":
            "Tech stack includes Python, PyTorch, TensorFlow, Qiskit, PennyLane, Docker, Kubernetes, MLflow, and GCP.",

        "experience":
            "Research Assistant at IIIT Kottayam since 2023, focusing on scalable ML systems."
    };

    function getAIResponse(question) {
        const q = question.toLowerCase();

        for (const key in knowledgeBase) {
            if (q.includes(key)) return knowledgeBase[key];
        }

        if (q.includes("hi") || q.includes("hello")) {
            return "Hello 👋 You can ask me about Sunoj’s research, projects, experience, or tech stack.";
        }

        if (q.includes("who")) {
            return "Sunoj Ragiri is an AI/ML & MLOps Engineer and Research Assistant at IIIT Kottayam.";
        }

        return "Try asking about research, projects, experience, or tech stack.";
    }

    // -------------------------------
    // Message UI
    // -------------------------------
    function addMessage(text, isUser = false) {
        const msg = document.createElement("div");
        msg.className = `message ${isUser ? "user" : ""}`;

        msg.innerHTML = `
            <div class="message-avatar">${isUser ? "👤" : "🤖"}</div>
            <div class="message-bubble">${text}</div>
        `;

        chatMessages.appendChild(msg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // -------------------------------
    // Send message
    // -------------------------------
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        addMessage(message, true);
        chatInput.value = "";

        typingIndicator.classList.add("active");

        setTimeout(() => {
            typingIndicator.classList.remove("active");
            addMessage(getAIResponse(message));
        }, 700);
    }

    sendBtn.onclick = sendMessage;

    chatInput.onkeypress = (e) => {
        if (e.key === "Enter") sendMessage();
    };

    // -------------------------------
    // Quick actions
    // -------------------------------
    document.querySelectorAll(".quick-action-btn").forEach(btn => {
        btn.onclick = () => {
            chatInput.value = btn.dataset.question;
            sendMessage();
        };
    });

});
