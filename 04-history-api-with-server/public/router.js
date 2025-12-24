// ---------------------------------------------
// ROUTE DEFINITIONS (Simple SPA Pages)
// ---------------------------------------------
// Each key represents a URL path.
// Each value represents the HTML that will be rendered for that route.
const routes = {
  '/': `
      <h1>Home Page</h1>
      <p>This is the Home screen rendered using History API Routing.</p>

      <div class="search-container">
        <!-- Input field whose value is preserved across route changes -->
        <input id="searchInput" placeholder="Type something..." />
      </div>

      <div class="counter-container">
        <!-- Button triggers JS function "count()" -->
        <button onclick="count()">Increase</button>
        <p id="value">0</p>
      </div>
    `,

  '/about': `
      <h1>About Page</h1>
      <p>You are now on the About screen.</p>
    `,

  '/contact': `
      <h1>Contact Page</h1>
      <p>This is the Contact screen.</p>
    `
};



// ---------------------------------------------
// CLIENT-SIDE NAVIGATION (History API)
// ---------------------------------------------
// Updates the URL WITHOUT reloading the page.
// After updating the path, it renders the corresponding page.
function navigateTo(url) {
  history.pushState(null, '', url); // Push new URL to the browser's history stack
  renderRoute();                    // Re-render UI based on the updated path
}



// ---------------------------------------------
// ROUTER FUNCTION: Renders the correct page
// ---------------------------------------------
// - Reads current URL
// - Finds matching page template
// - Injects template into #app container
// - Restores UI state (input + counter)
function renderRoute() {
  const path = window.location.pathname;        // Current browser path
  const page = routes[path] || routes['/'];     // Default to home if path doesn't exist

  document.getElementById('app').innerHTML = page; // Replace page content
  restoreState();                                  // Restore counter + saved input text
}



// ---------------------------------------------
// INTERCEPT LINK CLICKS (SPA navigation)
// ---------------------------------------------
// Any <a data-link> click will:
// - Prevent full page reload
// - Navigate using History API
document.addEventListener('click', event => {
  if (event.target.matches('[data-link]')) {
    event.preventDefault();               // Stop browser reload
    navigateTo(event.target.href);        // Perform SPA navigation instead
  }
});



// ---------------------------------------------
// BROWSER BACK/FORWARD BUTTON SUPPORT
// ---------------------------------------------
// When the user clicks Back or Forward,
// the popstate event fires → re-render the route.
window.addEventListener('popstate', renderRoute);



// ---------------------------------------------
// INITIAL PAGE LOAD
// ---------------------------------------------
// When the page loads, render the correct route.
window.addEventListener('load', renderRoute);



// ---------------------------------------------
// STATE (Counter + Input Persistence)
// ---------------------------------------------
// These variables store values in memory to preserve UI state.
let num = 0;
let savedInputValue = "";



// ---------------------------------------------
// COUNTER INCREMENT FUNCTION
// ---------------------------------------------
// Called when the user clicks the "Increase" button.
// Updates UI and preserves counter value.
function count() {
  num++;
  document.getElementById("value").textContent = num;
}



// ---------------------------------------------
// RESTORE UI STATE AFTER ROUTE CHANGE
// ---------------------------------------------
// Because the DOM gets fully replaced each time a route is rendered,
// we must re-populate:
// - The input field text
// - The counter number
// - The input event listener
function restoreState() {
  const input = document.getElementById("searchInput");
  const counter = document.getElementById("value");

  // Restore input field value and keep updating saved state
  if (input) {
    input.value = savedInputValue;
    input.addEventListener("input", e => savedInputValue = e.target.value);
  }

  // Restore counter text
  if (counter) {
    counter.textContent = num;
  }
}
