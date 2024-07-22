document.addEventListener('DOMContentLoaded', () => {
    const waterBar = document.getElementById('water-bar');
    const waterLabel = document.getElementById('water-label');
    const waterInput = document.getElementById('water-input');
    const logWaterButton = document.getElementById('log-water');
    const waterLog = document.getElementById('water-log');

    const dailyGoal = 2000; // Daily water intake goal in ml
    let currentIntake = 0; // Current water intake in ml

    function updateWaterIntake(amount) {
        currentIntake += amount;
        if (currentIntake > dailyGoal) {
            currentIntake = dailyGoal;
        }

        const percentage = (currentIntake / dailyGoal) * 100;
        waterBar.style.width = `${percentage}%`;
        waterLabel.textContent = `${Math.round(percentage)}%`;
    }

    function logWater(amount) {
        const now = new Date();
        const formattedTime = now.toLocaleTimeString();
        const formattedDate = now.toLocaleDateString();
        const listItem = document.createElement('li');
        listItem.textContent = `${formattedDate} ${formattedTime} - ${amount} ml`;
        waterLog.appendChild(listItem);
    }

    logWaterButton.addEventListener('click', () => {
        const amount = parseInt(waterInput.value);
        if (!isNaN(amount) && amount > 0) {
            updateWaterIntake(amount);
            logWater(amount);
            waterInput.value = '';
        }
    });
});
