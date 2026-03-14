const express = require('express');
const path = require('path');

const app = express();
const browserDistPath = path.join(__dirname, 'dist', 'myFlix-Angular-client', 'browser');

// Angular application builder outputs browser assets in this directory.
app.use(express.static(browserDistPath));

// Express 5 requires a regex (or named wildcard) for a catch-all route.
app.get(/.*/, function(req, res) {
  res.sendFile(path.join(browserDistPath, 'index.html'));
});

// Start the app by listening on the default Heroku port
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Server started on port ' + port);
});
