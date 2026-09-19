document.addEventListener("DOMContentLoaded", () => {
    
    // --- Modal Logic ---
    const createModalBtn = document.getElementById("openCreateModalBtn");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const modalOverlay = document.getElementById("createStudyModal");
    const studyForm = document.querySelector(".create-study-form");

    // Open Modal
    createModalBtn.addEventListener("click", () => {
        modalOverlay.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent background scrolling
    });

    // Close Modal
    const closeModal = () => {
        modalOverlay.classList.remove("active");
        document.body.style.overflow = "auto";
    };

    closeModalBtn.addEventListener("click", closeModal);

    // Close on outside click
    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    // Handle Form Submission
    studyForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const btn = studyForm.querySelector(".btn-large");
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Creating Room...';
        
        // Mock API call delay
        setTimeout(() => {
            alert("Success! Your Kingdom Study room has been created.");
            studyForm.reset();
            btn.innerHTML = originalText;
            closeModal();
        }, 1200);
    });

    // --- Time Zone Handling Mock Logic[cite: 2]---
    // The vision document specifies automatically showing meeting times in the user's local time zone.
    const initializeTimeZones = () => {
        // In a real application, you would use Intl.DateTimeFormat().resolvedOptions().timeZone
        // to detect the user's timezone and map the database UTC times to local times.
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        console.log(`Detected User Timezone: ${userTimeZone}`);
        
        // This is where you would iterate over DOM elements with a generic data-utc-time attribute
        // and convert them to render "7:00 PM EST", "4:00 PM PST", etc., based on the user's system.
    };

    initializeTimeZones();
});

// Update inside your existing studies.js file
studyForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = studyForm.querySelector(".btn-large");
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Creating Room...';

    // 1. Gather data from your HTML form inputs
    const studyData = {
        name: document.getElementById("studyNameInput").value,
        topic: document.getElementById("studyTopicInput").value,
        description: document.getElementById("studyDescInput").value,
        meetingDay: document.getElementById("studyDaySelect").value,
        meetingTimeUTC: "19:00:00Z", // You would calculate this based on user timezone input
        isPublic: true 
    };

    try {
        // 2. Send the HTTP POST request to your Node.js API
        const response = await fetch('http://localhost:3000/api/studies', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(studyData)
        });

        if (response.ok) {
            const savedStudy = await response.json();
            alert(`Success! ${savedStudy.name} has been created.`);
            studyForm.reset();
            closeModal();
        } else {
            alert("Error creating study.");
        }
    } catch (error) {
        console.error("Network error:", error);
    } finally {
        btn.innerHTML = originalText;
    }
});