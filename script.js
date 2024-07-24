document.getElementById('waterForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const goal = parseInt(document.getElementById('waterGoal').value, 10);
    const amount = parseInt(document.getElementById('waterAmount').value, 10);
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  
    if (isNaN(goal) || isNaN(amount)) return;
  
    const intakeLog = document.getElementById('intakeLog');
    const progressBar = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
  
    const newLogEntry = document.createElement('div');
    newLogEntry.className = 'p-4 border rounded-lg shadow-md bg-dark text-dark';
    newLogEntry.innerHTML = `
      <p class="text-lg font-semibold">Intake: ${amount} ml</p>
      <p class="text-sm">Logged at: ${formattedDate}</p>
    `;
  
    intakeLog.appendChild(newLogEntry);
  
    // Update progress
    const currentIntake = (parseFloat(progressBar.style.width) / 100) * goal + amount;
    const progress = Math.min(currentIntake / goal * 100, 100);
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${Math.round(currentIntake)} ml / ${goal} ml`;
  
    // Clear the form fields
    document.getElementById('waterAmount').value = '';
  });
  
  // Reset button functionality
  document.getElementById('resetButton').addEventListener('click', function() {
    document.getElementById('waterGoal').value = '';
    document.getElementById('waterAmount').value = '';
    document.getElementById('progressFill').style.width = '0%';
    document.getElementById('progressText').textContent = '0 ml / 0 ml';
    document.getElementById('intakeLog').innerHTML = '';
  });
  
  // Toggle dark/light mode for the card
  document.getElementById('themeToggle').addEventListener('change', function() {
    const card = document.getElementById('card');
    const cardText = card.querySelectorAll('p, h1, label');
    const inputs = card.querySelectorAll('input');
    const goalLabel = document.getElementById('goalLabel');
    const intakeLabel = document.getElementById('intakeLabel');
    const progressText = document.getElementById('progressText');
    const modeIcon = document.getElementById('modeIcon');
  
    if (this.checked) {
      card.classList.remove('card-dark');
      card.classList.add('card-light');
      cardText.forEach(el => {
        el.classList.add('text-black');
        el.classList.remove('text-white');
      });
      inputs.forEach(el => {
        el.classList.remove('text-black');
      });
      goalLabel.classList.add('text-dark');
      intakeLabel.classList.add('text-dark');
      progressText.classList.add('text-black');
      progressText.classList.remove('text-white');
      const logEntries = document.querySelectorAll('#intakeLog > div');
      logEntries.forEach(entry => {
        entry.classList.add('bg-dark');
        entry.classList.remove('bg-gray-800');
      });
      modeIcon.classList.remove('fa-moon');
      modeIcon.classList.add('fa-sun');
      modeIcon.classList.remove('text-white');
      modeIcon.classList.add('text-black');
    } else {
      card.classList.remove('card-light');
      card.classList.add('card-dark');
      cardText.forEach(el => {
        el.classList.add('text-white');
        el.classList.remove('text-black');
      });
      inputs.forEach(el => {
        el.classList.add('text-black');
      });
      goalLabel.classList.remove('text-dark');
      intakeLabel.classList.remove('text-dark');
      progressText.classList.add('text-white');
      progressText.classList.remove('text-black');
      const logEntries = document.querySelectorAll('#intakeLog > div');
      logEntries.forEach(entry => {
        entry.classList.remove('bg-dark');
        entry.classList.add('bg-gray-800');
      });
      modeIcon.classList.remove('fa-sun');
      modeIcon.classList.add('fa-moon');
      modeIcon.classList.remove('text-black');
      modeIcon.classList.add('text-white');
    }
  });
  