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
	constructor(t) {
		this.title = t;
	}

	save() {
		getTasksFromFile(tasks => {
			tasks.push(this);
			fs.writeFile(p, JSON.stringify(tasks), (err) => {
				console.log(err);
			});
		});
	}

	static fetchAll(cb) {
		getTasksFromFile(cb);
	}
};