// ===========================
// PART 2: GLOBAL SCOPE
// Global variable: can be used by multiple functions.
// This holds the current score value.
// ===========================
let totalScore = 0;

// Get DOM elements used in several parts
const scoreInput = document.getElementById("score-input");
const scoreValueSpan = document.getElementById("score-value");
const scoreMessage = document.getElementById("score-message");

const addScoreBtn = document.getElementById("add-score-btn");
const subtractScoreBtn = document.getElementById("subtract-score-btn");
const resetScoreBtn = document.getElementById("reset-score-btn");

const animateBoxBtn = document.getElementById("animate-box-btn");
const toggleModalBtn = document.getElementById("toggle-modal-btn");
const closeModalBtn = document.getElementById("close-modal-btn");

const box = document.getElementById("box");
const modalOverlay = document.getElementById("modal-overlay");

// ===========================
// PART 2: FUNCTIONS
// With parameters & return values
// ===========================

/**
 * Converts user input to a number.
 * Parameter: inputElement (DOM element)
 * Return: number (NaN if invalid)
 */
function getAmountFromInput(inputElement) {
  const valueAsString = inputElement.value; // local variable (function scope)
  const valueAsNumber = Number(valueAsString);
  return valueAsNumber;
}

/**
 * Updates the global totalScore by adding "amount".
 * Parameter: amount (number)
 * Return: new totalScore (number)
 */
function addToTotal(amount) {
  totalScore = totalScore + amount;
  return totalScore;
}

/**
 * Sets the score text on the page.
 * Parameter: score (number)
 * Return: a message string that describes the new score.
 */
function updateScoreDisplay(score) {
  scoreValueSpan.textContent = score;

  // Local variable only visible inside this function.
  let message;

  if (score > 50) {
    message = "Score is high, nice job!";
  } else if (score < 0) {
    message = "Score is below zero. Careful!";
  } else {
    message = "Score is in a normal range.";
  }

  scoreMessage.textContent = message;
  return message;
}

/**
 * Helper function to reset the score.
 * No parameters.
 * Return: nothing (undefined).
 */
function resetScore() {
  totalScore = 0; // changes global variable
  scoreInput.value = 5;
  updateScoreDisplay(totalScore);
}

/**
 * Simple function to demonstrate local vs global scope.
 * It creates a local variable "bonus" that is not available outside.
 */
function applyBonusOnce() {
  const bonus = 10; // local scope
  totalScore = totalScore + bonus;
  updateScoreDisplay(totalScore);
  // console.log(bonus); // works here
}

// ===========================
// PART 3: JS + CSS Animations
// Functions that add/remove CSS classes
// ===========================

/**
 * Triggers the jump animation on the box.
 * Uses the "animate" class defined in CSS.
 */
function triggerBoxAnimation() {
  // Remove animation class if already there
  box.classList.remove("animate");

  // Force reflow to restart animation (common trick)
  void box.offsetWidth;

  box.classList.add("animate");
}

/**
 * Opens the modal by adding the "active" class.
 */
function openModal() {
  modalOverlay.classList.add("active");
}

/**
 * Closes the modal by removing the "active" class.
 */
function closeModal() {
  modalOverlay.classList.remove("active");
}

/**
 * Toggles the modal open/closed.
 * Returns true if it ends up open, false if closed.
 */
function toggleModal() {
  const isActive = modalOverlay.classList.contains("active");
  if (isActive) {
    closeModal();
    return false;
  } else {
    openModal();
    return true;
  }
}

// ===========================
// EVENT LISTENERS
// Hooking up UI to functions
// ===========================

// --- Score buttons ---
addScoreBtn.addEventListener("click", function () {
  const amount = getAmountFromInput(scoreInput);
  if (isNaN(amount)) {
    scoreMessage.textContent = "Please enter a valid number.";
    return;
  }
  const newScore = addToTotal(amount);
  updateScoreDisplay(newScore);
});

subtractScoreBtn.addEventListener("click", function () {
  const amount = getAmountFromInput(scoreInput);
  if (isNaN(amount)) {
    scoreMessage.textContent = "Please enter a valid number.";
    return;
  }
  const newScore = addToTotal(-amount);
  updateScoreDisplay(newScore);
});

resetScoreBtn.addEventListener("click", function () {
  resetScore();
  // demo: apply a small bonus after reset using local scope function
  applyBonusOnce();
});

// Initialize score display once on page load
updateScoreDisplay(totalScore);

// --- Box animation button ---
animateBoxBtn.addEventListener("click", function () {
  triggerBoxAnimation();
});

// Remove "animate" class when animation finishes so it can be replayed
box.addEventListener("animationend", function () {
  box.classList.remove("animate");
});

// --- Modal buttons ---
toggleModalBtn.addEventListener("click", function () {
  toggleModal();
});

closeModalBtn.addEventListener("click", function () {
  closeModal();
});

// Clicking the dark overlay closes the modal too
modalOverlay.addEventListener("click", function (event) {
  // Only close if they clicked outside the modal box itself
  if (event.target === modalOverlay) {
    closeModal();
  }
});
