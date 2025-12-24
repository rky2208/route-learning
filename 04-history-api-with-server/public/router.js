// -----------------------------------------------------------
// ROUTE DEFINITIONS
// -----------------------------------------------------------
// A simple object that maps URL paths to the HTML content that
// should be displayed for each route. This acts as a tiny view
// system for our Single Page Application.
const routes = {
  '/': `
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

  '/about': `
      <h1>About Page</h1>
      <p>You are now on the About screen.</p>
    `,

  '/contact': `
      <h1>Contact Page</h1>
      <p>This is the Contact screen.</p>
    `
};



// -----------------------------------------------------------
// navigateTo() — CLIENT-SIDE NAVIGATION
// -----------------------------------------------------------
// A helper that updates the browser URL WITHOUT refreshing the page.
// Then it re-renders the appropriate screen using our router.
//
// Example:
//   navigateTo("/about")
//
// This will:
//   1. Change the URL to /about
//   2. Render the About page
function navigateTo(url) {
  history.pushState(null, '', url); // Push new URL onto browser history stack
  renderRoute();                    // Render appropriate route view
}



// -----------------------------------------------------------
// renderRoute() — MAIN ROUTER FUNCTION
// -----------------------------------------------------------
// Determines which HTML template should be displayed based on
// the current browser path.
//
// Steps:
//   1. Read window.location.pathname (e.g., "/", "/about")
//   2. Look up the associated route template
//   3. Inject the template into #app
//   4. Restore UI state (input + counter)
function renderRoute() {
  const path = window.location.pathname;     // Current route path
  const page = routes[path] || routes['/'];  // Fallback to Home page

  // Render the route-specific HTML
  document.getElementById('app').innerHTML = page;

  // DOM was replaced, so restore persistent UI state
  restoreState();
}



// -----------------------------------------------------------
// LINK INTERCEPTION — PREVENT FULL PAGE RELOAD
// -----------------------------------------------------------
// Instead of allowing <a> tags to reload the page, we intercept
// clicks on links that contain [data-link].
//
// Example:
//   <a href="/about" data-link>About</a>
//
// This:
//   - prevents the default browser behavior
//   - replaces it with navigateTo()
document.addEventListener('click', event => {
  if (event.target.matches('[data-link]')) {
    event.preventDefault();               // Stop browser navigation
    navigateTo(event.target.href);        // Use SPA navigation instead
  }
});



// -----------------------------------------------------------
// BROWSER HISTORY SUPPORT (Back / Forward)
// -----------------------------------------------------------
// When the user presses the browser back or forward buttons,
// the "popstate" event fires. We need to re-render the correct
// route manually.
window.addEventListener('popstate', renderRoute);



// -----------------------------------------------------------
// INITIAL PAGE LOAD
// -----------------------------------------------------------
// When the user first opens the site or refreshes it,
// we manually render the page based on the current URL.
window.addEventListener('load', renderRoute);
