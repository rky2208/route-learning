// -------------------------------------------------------------
// ROUTE DEFINITIONS
// -------------------------------------------------------------
// Each key corresponds to a browser pathname (e.g., "/", "/about").
// Each value is the HTML that should be rendered for that route.
const routes = {
  "/": `
      <h1>Home Page</h1>
      <p>This is the Home screen rendered using History API Routing.</p>

      <div class="search-container">
        <input id="searchInput" placeholder="Type something..." />
      </div>

      <div class="counter-container">
        <button onclick="count()">Increase</button>
        <p id="value">0</p>
      </div>
    `,

  "/about": `
      <h1>About Page</h1>
      <p>You are now on the About screen.</p>
    `,

  "/contact": `
      <h1>Contact Page</h1>
      <p>This is the Contact screen.</p>
    `,
};



// -------------------------------------------------------------
// CLIENT-SIDE NAVIGATION (History API)
// -------------------------------------------------------------
// Updates the URL in the browser WITHOUT reloading the page.
// After updating the address bar, it triggers a UI re-render.
function navigateTo(url) {
  history.pushState(null, "", url); // Push new state into browser history
  renderRoute();                    // Re-render the view for the new route
}



// -------------------------------------------------------------
// ROUTE RENDERING FUNCTION
// -------------------------------------------------------------
// Determines which HTML to show based on the current URL path.
// Steps:
//   1. Read current path (window.location.pathname)
//   2. Look up matching template from routes[]
//   3. Inject template into #app container
//   4. Restore any preserved UI state (counter + input text)
function renderRoute() {
  const path = window.location.pathname;     // e.g., "/about"
  const page = routes[path] || routes["/"];  // Fallback to home page

  // Replace page content with the template
  document.getElementById("app").innerHTML = page;

  // Restore UI state AFTER the DOM for this route is re-created
  restoreState();
}



// -------------------------------------------------------------
// LINK INTERCEPTION (Prevent Full Page Reloads)
// -------------------------------------------------------------
// Any <a data-link>...</a> will:
//   - Prevent default browser navigation
//   - Use SPA navigation instead
document.addEventListener("click", (event) => {
  if (event.target.matches("[data-link]")) {
    event.preventDefault();              // Stop browser from reloading the page
    navigateTo(event.target.href);       // Let our router handle navigation
  }
});



// -------------------------------------------------------------
// BACK/FORWARD BUTTON SUPPORT
// -------------------------------------------------------------
// When the user presses the browser’s back/forward buttons,
// the popstate event fires. We re-render the correct route.
window.addEventListener("popstate", renderRoute);



// -------------------------------------------------------------
// INITIAL PAGE LOAD
// -------------------------------------------------------------
// When the user first opens the site (or refreshes), we render
// the correct route based on the current URL.
window.addEventListener("load", renderRoute);
