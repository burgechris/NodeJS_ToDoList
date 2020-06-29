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

//CREATE METHOD
app.post('/', (req,res) => {
  const title = req.body.title
  const task = new Task(null, title);
  task.save();
  res.redirect("/");
});

//READ METHOD
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

//UPDATE METHOD
app.get("/edit/:taskId", (req, res) => {
    const taskId = req.params.taskId;
    Task.findById(taskId, task=> {
      res.render("todoEdit", {
        task: task,
        path: "/todoEdit",
        pageTitle: "Edit Task"
      });
    })
  });

app.post("/edit/", (req, res) => {
	const taskId = req.body.taskId;
	const updatedTitle = req.body.title;
	const updatedTask = new Task(taskId, updatedTitle);
	updatedTask.save();
	res.redirect("/");
});

//DELETE METHOD
app.post("/remove/:taskId", (req, res) => {
  const taskId = req.body.taskId;
  Task.deleteById(taskId);
  res.redirect("/");
})

app.listen(3000, () => console.log("Server Up and running"));

