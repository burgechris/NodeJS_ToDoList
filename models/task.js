const fs = require("fs");
const path = require("path");

const p = path.join(
	path.dirname(process.mainModule.filename),
	"data",
	"todolist.json"
);

const getTasksFromFile = cb => {
	fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Task {
	constructor(id, title) {
		this.id = id;
		this.title = title;
	}

	save() {
		getTasksFromFile((tasks) => {
			if (this.id) {
				const existingTaskIndex = tasks.findIndex(
					task => task.id === this.id
				);
				const updatedTasks = [...tasks];
				updatedTasks[existingTaskIndex] = this;
				fs.writeFile(p, JSON.stringify(updatedTasks), (err) => {
					console.log(err);
				});
			} else {
				this.id = Math.random().toString();
				tasks.push(this);
				fs.writeFile(p, JSON.stringify(tasks), (err) => {
					console.log(err);
				});
			}
		});
	}

	static deleteById(id) {
		getTasksFromFile(tasks => {
			const task = tasks.find(task => task.id === id);
			const updatedTasks = tasks.filter(task => task.id !== id);
			fs.writeFile(p, JSON.stringify(updatedTasks), (err) => {
				console.log(err);
			});
		});
	}

	static fetchAll(cb) {
		getTasksFromFile(cb);
	}

	static findById(id, cb) {
		getTasksFromFile((tasks) => {
			const task = tasks.find((t) => t.id === id);
			cb(task);
		});
	}
};

