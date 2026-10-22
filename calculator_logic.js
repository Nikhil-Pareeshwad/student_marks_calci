/**
 * Processes and validates an array of student marks.
 * Rules enforced:
 * - Marks cannot exceed 100.
 * - Marks cannot be negative.
 * - Passing mark is 35 per subject.
 * - Supports decimals.
 * 
 * @param {Array<number|string>} marks - Array of marks for each subject
 * @returns {Object} Result object containing validation status, errors, and calculations
 */
function processMarks(marks) {
  if (!Array.isArray(marks) || marks.length === 0) {
    return { isValid: false, error: "No marks provided." };
  }

  let total = 0;
  let hasFailedSubject = false;

  for (let i = 0; i < marks.length; i++) {
    const rawValue = marks[i];

    // Check if input is empty or missing
    if (rawValue === '' || rawValue === null || rawValue === undefined) {
      return {
        isValid: false,
        error: `Please enter marks for all subjects. (Subject ${i + 1} is empty)`
      };
    }

    const mark = typeof rawValue === 'number' ? rawValue : parseFloat(rawValue);

    // Check for valid numeric entry
    if (isNaN(mark)) {
      return {
        isValid: false,
        error: `Invalid number in Subject ${i + 1}.`
      };
    }

    // Rule: Cannot be negative
    if (mark < 0) {
      return {
        isValid: false,
        error: `Subject ${i + 1} cannot be negative (${mark}).`
      };
    }

    // Rule: Cannot exceed 100
    if (mark > 100) {
      return {
        isValid: false,
        error: `Subject ${i + 1} mark (${mark}) cannot exceed 100.`
      };
    }

    // Rule: Passing is 35 per subject
    if (mark < 35) {
      hasFailedSubject = true;
    }

    total += mark;
  }

  const numberOfSubjects = marks.length;
  const percentage = (total / (numberOfSubjects * 100)) * 100;
  const status = hasFailedSubject ? 'FAILED' : 'PASSED';

  return {
    isValid: true,
    total: parseFloat(total.toFixed(2)),
    percentage: parseFloat(percentage.toFixed(2)),
    status: status
  };
}

// Export for Node.js / testing environments (CommonJS)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { processMarks };
}