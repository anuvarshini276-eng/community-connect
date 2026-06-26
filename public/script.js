document.addEventListener('DOMContentLoaded', () => {
    const moodForm = document.getElementById('moodForm');
    const moodScale = document.getElementById('moodScale');
    const moodValue = document.getElementById('moodValue');

    // 1. Dynamic Slider Counter Logic
    moodScale.addEventListener('input', (customEvent) => {
        moodValue.textContent = customEvent.target.value;
    });

    // 2. Form Submission API Logic
    moodForm.addEventListener('submit', async (customEvent) => {
        customEvent.preventDefault(); // Prevents the page from refreshing

        const payloadData = {
            moodScale: moodScale.value,
            journalText: document.getElementById('journalText').value
        };

        try {
            const response = await fetch('/api/mood', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payloadData)
            });

            const backendResult = await response.json();

            if (response.status === 201) {
                alert(`🎉 Success! Data Point Captured.\nMood Score: ${backendResult.entry.moodScale}`);
                
                // === THE CRUCIAL UPDATE ===
                window.location.href = "history.html"; 
                
            } else {
                alert('Something went wrong saving your entry.');
            }

        } catch (error) {
            console.error('Error communicating with the server:', error);
            alert('Could not connect to the backend server right now.');
        }
    });
});