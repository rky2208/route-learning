// ------------------------------------------------------
// APPLICATION STATE (stored in memory)
// ------------------------------------------------------
// "num" keeps the counter value persistent across routes.
// "savedInputValue" stores whatever text the user types.
// Since these live outside the render functions, they survive navigation.
let num = 0;
let savedInputValue = "";



// ------------------------------------------------------
// INCREMENT COUNTER
// ------------------------------------------------------
// Called when the user clicks the "Increase" button.
// Updates both the internal state ("num") and the UI text.
function count() {
  num++;  // update stored value
  document.getElementById("value").textContent = num; // update UI
}



// ------------------------------------------------------
// RESTORE STATE AFTER ROUTE CHANGE
// ------------------------------------------------------
// This function is called every time HTML is re-rendered.
// Because route changes replace the entire #app content,
// the input and counter elements are re-created from scratch.
//
// This function:
// 1. Finds the new elements
// 2. Restores the saved input value
// 3. Re-attaches the input listener to keep tracking state
// 4. Restores the counter value
function restoreState() {
  const input = document.getElementById("searchInput");
  const counter = document.getElementById("value");

  // Restore input field value and keep monitoring changes
  if (input) {
    input.value = savedInputValue;
    input.addEventListener("input", (e) => {
      savedInputValue = e.target.value; // keep latest text in memory
    });
  }

  // Restore counter text
  if (counter) {
    counter.textContent = num;
  }
}
