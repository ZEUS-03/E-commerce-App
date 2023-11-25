const http = require("http");
const app = require("./app/app.js");
require("dotenv").config();

const PORT = process.env.PORT || 7210;

const server = http.createServer(app);
server.listen(7210, console.log("server is listening on port " + PORT));
