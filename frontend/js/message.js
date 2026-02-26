document.getElementById("pageMessageForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const status = document.getElementById("formStatus");

    const data = {
        name: document.getElementById("msgName").value,
        email: document.getElementById("msgEmail").value,
        message:
            "Company: " +
            document.getElementById("msgCompany").value +
            "\n\n" +
            document.getElementById("msgMessage").value
    };

    status.style.display = "block";
    status.style.background = "#f1f5f9";
    status.style.color = "#000";
    status.innerText = "⏳ Sending message...";

    try {
        const res = await fetch("http://localhost:8000/send-message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            status.style.background = "#dcfce7";
            status.style.color = "#166534";
            status.innerText = "✅ Message sent successfully!";
            e.target.reset();
        } else {
            throw new Error("Server error");
        }

    } catch (err) {
        status.style.background = "#fee2e2";
        status.style.color = "#991b1b";
        status.innerText = "❌ Failed to send message. Please try again later.";
    }
});
