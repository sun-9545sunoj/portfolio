document.getElementById("pageMessageForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const status = document.getElementById("formStatus");
    const form = e.target;

    // Formspree endpoint URL
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/xkjonlaz"; 

    const data = {
        name: document.getElementById("msgName").value,
        email: document.getElementById("msgEmail").value,
        company: document.getElementById("msgCompany").value,
        message: document.getElementById("msgMessage").value
    };

    status.style.display = "block";
    status.style.background = "#f1f5f9";
    status.style.color = "#000";
    status.innerText = "⏳ Sending message...";

    if (FORMSPREE_ENDPOINT.includes("YOUR_FORM_ID")) {
        status.style.background = "#fffbeb";
        status.style.color = "#b45309";
        status.innerHTML = `⚠️ Formspree endpoint not configured. <br>Please replace <code>YOUR_FORM_ID</code> in <code>js/message.js</code>.`;
        return;
    }

    try {
        const res = await fetch(FORMSPREE_ENDPOINT, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            status.style.background = "#dcfce7";
            status.style.color = "#166534";
            status.innerText = "✅ Message sent successfully!";
            form.reset();
        } else {
            throw new Error("Server error");
        }

    } catch (err) {
        status.style.background = "#fee2e2";
        status.style.color = "#991b1b";
        status.innerText = "❌ Failed to send message. Please try again later.";
    }
});
