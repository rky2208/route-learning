// Define pages
const routes = {
    home: `
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
  
    about: `
      <h1>About Page</h1>
      <p>You are now on the About screen.</p>
    `,
  
    contact: `
      <h1>Contact Page</h1>
      <p>This is the Contact screen.</p>
    `
  };
  
  // Handle route rendering
  function renderRoute() {
    const hash = window.location.hash.slice(1) || "home";
  
    console.log("H---",hash)
    console.log("Current route:", hash); // Debug check
  
    const content = routes[hash];
  
    if (!content) {
      document.getElementById("app").innerHTML = "<h1>404 - Page Not Found</h1>";
      return;
    }
  
    // Render screen
    document.getElementById("app").innerHTML = content;
  
    // Restore JS features (input + counter)
    restoreState();
  }
  
  window.addEventListener("hashchange", renderRoute);
  window.addEventListener("load", renderRoute);
  