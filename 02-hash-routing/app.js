let num = 0;
let savedInputValue = "";

// Count function
function count() {
  num++;
  document.getElementById("value").textContent = num;
}

// Restore state after route render
function restoreState() {
  const input = document.getElementById("searchInput");
  const counter = document.getElementById("value");

  if (input) {
    input.value = savedInputValue;
    input.addEventListener("input", (e) => {
      savedInputValue = e.target.value;
    });
  }

  if (counter) {
    counter.textContent = num;
  }
}
