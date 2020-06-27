const path = require('path')

const express = require("express");
const bodyParser = require("body-parser");

const Task = require("./models/task")

// const taskController = require("./controllers/tasks");

const app = express();

app.use("/static", express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

//POST METHOD
app.post('/', (req,res) => {
  const task = new Task( req.body.title );
  task.save();
  res.redirect("/");
});

//GET METHOD
app.get("/", (req, res) => {
  Task.fetchAll((tasks) => {
		res.render("todoList", {
			tasks: tasks,
			pageTitle: "To Do List",
			path: "/",
			hasTasks: tasks.length > 0,
			activetodoList: true,
		});
	});
});

// app.get("/", taskController.getAddTasks);

app.listen(3000, () => console.log("Server Up and running"));

