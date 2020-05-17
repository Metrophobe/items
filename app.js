const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const routes = require("./controllers/ItemController.js");
const server = express();

//config view engine
server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));
server.use(express.static(path.join(__dirname, "public")));
server.use(expressLayouts);
server.use(bodyParser.urlencoded({ extended: false })); //for forms
server.use(bodyParser.json()); // for json of course

//server.use(cors());

//For Debugging = REMOVE WHEN DONE
server.use("/", (req, res, next) => {
  console.log(req.url);
  next();
});

//config routes
routes(server);

server.listen(3000);
