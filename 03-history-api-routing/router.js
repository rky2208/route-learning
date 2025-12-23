// Define pages
const routes = {
  '/': `
      <h1>Home Page</h1>
      <p>This is the Home screen rendered using Hash Routing.</p>
  
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
    `
  };
  
  // Navigate to a route (client-side)
function navigateTo(url) {
  history.pushState(null, '', url);  // Change URL without reload
  renderRoute();                     // Render screen
}

// Render content based on current path
function renderRoute() {
  const path = window.location.pathname;
  const page = routes[path] || routes['/']; // Fallback to home

  document.getElementById('app').innerHTML = page;
}

// Intercept navigation clicks
document.addEventListener('click', event => {
  if (event.target.matches('[data-link]')) {
    event.preventDefault();               
    navigateTo(event.target.href);        
  }
});

// For Back/Forward browser buttons
window.addEventListener('popstate', renderRoute);

// Initial load
window.addEventListener('load', renderRoute);
