const path = require('path')

const express = require("express");
const bodyParser = require("body-parser");

const taskController = require("./controllers/tasks");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

app.get('/', taskController.getTasks);
app.get('/', taskController.getAddTasks);
app.post('/', taskController.postAddTask);

app.listen(3000, () => console.log("Server Up and running"));

