const Task = require("../models/task");

exports.getAddTasks = (req, res, next) => {
  res.render("todoList", {
		pageTitle: "To Do List",
		path: "/",
		activeAddTask: true,
	});
};

exports.postAddTask = (req, res, next) => {
	const task = new Task(req.body.title);
	task.save();
	res.redirect("/");
};

exports.getTasks = (req, res, next) => {
	Task.fetchAll((tasks) => {
		res.render("todoList", {
			tasks: tasks,
			pageTitle: "To Do List",
			path: "/",
			hasTasks: tasks.length > 0,
			activetodoList: true
		});
	});
};
