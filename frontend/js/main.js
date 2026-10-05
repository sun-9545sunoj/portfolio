// Theme toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    themeToggle.textContent =
        document.body.classList.contains('light') ? '☀️' : '🌙';
});

// Modal
const modal = document.getElementById('contactModal');
const contactBtn = document.getElementById('contactBtn');
const closeModal = document.getElementById('closeModal');

if (contactBtn && modal && closeModal) {
    contactBtn.addEventListener('click', () => modal.classList.add('active'));
    closeModal.addEventListener('click', () => modal.classList.remove('active'));

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ================= GITHUB STATS =================
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('assets/github-stats.json');
        if (response.ok) {
            const stats = await response.json();
            const ghRepos = document.getElementById('ghRepos');
            const ghFollowers = document.getElementById('ghFollowers');
            
            if (ghRepos) ghRepos.textContent = stats.public_repos || '--';
            if (ghFollowers) ghFollowers.textContent = stats.followers || '--';
        }
    } catch (err) {
        console.error("Failed to fetch GitHub stats:", err);
    }
});
