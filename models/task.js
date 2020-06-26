const fs = require("fs");
const path = require("path");

module.exports = class Task {
	constructor(t) {
		this.title = t;
	}

	save() {
		const p = path.join(
			path.dirname(process.mainModule.filename),
			"data",
			"todolist.json"
		);
		fs.readFile(p, (err, fileContent) => {
			let tasks = [];
			if (!err) {
				tasks = JSON.parse(fileContent);
			}
			tasks.push(this);
			fs.writeFile(p, JSON.stringify(tasks), (err) => {
				console.log(err);
			});
		});
	}

	static fetchAll(cb) {
		const p = path.join(
			path.dirname(process.mainModule.filename),
			"data",
			"todolist.json"
		);
		fs.readFile(p, (err, fileContent) => {
			if (err) {
				cb([]);
			}
			cb(JSON.parse(fileContent));
		});
	}
};