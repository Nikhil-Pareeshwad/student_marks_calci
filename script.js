document.getElementById('calculateBtn').addEventListener('click', calculateMarks);

function calculateMarks() {
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

  let total = 0;
  let hasFailedSubject = false;
  let isValid = true;
  let errorMessage = '';

  for (let i = 0; i < inputs.length; i++) {
    const rawValue = inputs[i].value.trim();

    // Check if input is empty
    if (rawValue === '') {
      errorMessage = `Please enter marks for all subjects. (Subject ${i + 1} is empty)`;
      isValid = false;
      break;
    }

    const mark = parseFloat(rawValue);

    // Rule 1: Check for valid numeric entry
    if (isNaN(mark)) {
      errorMessage = `Invalid number in Subject ${i + 1}.`;
      isValid = false;
      break;
    }

    // Rule 2: Cannot be negative
    if (mark < 0) {
      errorMessage = `Subject ${i + 1} cannot be negative (${mark}).`;
      isValid = false;
      break;
    }

    // Rule 3: Cannot exceed 100
    if (mark > 100) {
      errorMessage = `Subject ${i + 1} mark (${mark}) cannot exceed 100.`;
      isValid = false;
      break;
    }

    // Rule 4: Check individual subject passing criteria (Passing mark = 35)
    if (mark < 35) {
      hasFailedSubject = true;
    }

    total += mark;
  }

  // Handle validation error
  if (!isValid) {
    errorBox.textContent = errorMessage;
    errorBox.classList.remove('hidden');
    return;
  }

  // Calculation (Rule 5: Handles decimals using float parsing and fixed precision)
  const numberOfSubjects = inputs.length;
  const percentage = (total / (numberOfSubjects * 100)) * 100;

  // Render Results
  totalMarksSpan.textContent = total.toFixed(2).replace(/\.00$/, ''); // removes unnecessary .00
  percentageSpan.textContent = percentage.toFixed(2);

  if (hasFailedSubject) {
    passFailStatusSpan.textContent = 'FAILED (Scored below 35 in one or more subjects)';
    passFailStatusSpan.className = 'status failed';
  } else {
    passFailStatusSpan.textContent = 'PASSED';
    passFailStatusSpan.className = 'status passed';
  }

  resultsCard.classList.remove('hidden');
}