const express = require('express');
const app = express();

// Import the API routes from api.js
const apiRoutes = require('./api.js');

// Use the API routes
app.use(express.static('public'));

app.use('/', apiRoutes);

// Other server setup and middleware here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

