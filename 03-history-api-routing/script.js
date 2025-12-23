let num = 0;
let savedInputValue = "";

function count() {
  num++;
  document.getElementById("value").textContent = num;
}

function restoreState() {
  const input = document.getElementById("searchInput");
  const counter = document.getElementById("value");

  if (input) {
    input.value = savedInputValue;
    input.addEventListener("input", (e) => savedInputValue = e.target.value);
  }

  if (counter) {
    counter.textContent = num;
  }
}
