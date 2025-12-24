// ---------------------------------------------
// EXPRESS SERVER FOR SPA (Single Page Application)
// ---------------------------------------------
const express = require('express');
const path = require('path');
const app = express();


// ---------------------------------------------
// 1. SERVE STATIC FILES
// ---------------------------------------------
// Everything inside the "public" folder becomes accessible to the browser.
// This includes: index.html, CSS, images, JS files, etc.
// Example → /public/main.js becomes available at http://localhost:3000/main.js
app.use(express.static('public'));


// ---------------------------------------------
// 2. SPA FALLBACK ROUTE (History API Support)
// ---------------------------------------------
// If the browser tries to access a route like /about or /contact directly,
// Express would normally return 404.
//
// Instead, we ALWAYS return index.html,
// and the front-end router takes over and displays the correct page.
//
// Works for ANY unknown route: /about, /profile/123, /settings, etc.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// ---------------------------------------------
// 3. START SERVER
// ---------------------------------------------
// Runs the local development server on port 3000.
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
