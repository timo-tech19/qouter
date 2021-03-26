const path = require('path');

// Load env vars into application. Must be place before requiring app
require('dotenv').config({path: path.join(__dirname, '/config.env') });

const mongooose = require("mongoose");
const app = require("./app");
const port = process.env.PORT || 3000;


// Launch server
const server = app.listen(port, () => {
  console.log("Server started on https://localhost:" + port);
});
