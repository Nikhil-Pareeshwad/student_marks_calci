document.getElementById('calculateBtn').addEventListener('click', () => {
  const inputs = document.querySelectorAll('.mark-input');
  const errorBox = document.getElementById('errorMessage');
  const resultsCard = document.getElementById('results');
  
  const totalMarksSpan = document.getElementById('totalMarks');
  const percentageSpan = document.getElementById('percentage');
  const passFailStatusSpan = document.getElementById('passFailStatus');

  // Reset displays
  errorBox.textContent = '';
  errorBox.classList.add('hidden');
  resultsCard.classList.add('hidden');

  // Collect values from DOM inputs into an array
  const marksArray = Array.from(inputs).map(input => input.value);

  // Call the centralized logic function
  const result = processMarks(marksArray);

  // Handle validation error from logic file
  if (!result.isValid) {
    errorBox.textContent = result.error;
    errorBox.classList.remove('hidden');
    return;
  }

  // Render Successful Results
  totalMarksSpan.textContent = result.total;
  percentageSpan.textContent = result.percentage;

  if (result.status === 'FAILED') {
    passFailStatusSpan.textContent = 'FAILED (Scored below 35 in one or more subjects)';
    passFailStatusSpan.className = 'status failed';
  } else {
    passFailStatusSpan.textContent = 'PASSED';
    passFailStatusSpan.className = 'status passed';
  }

  resultsCard.classList.remove('hidden');
});