var parseService = require('../lib/parse-promises'),
	validationService = require('../lib/validation');

var className = 'wines';

exports.options = function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain', 'Allow': 'GET,POST,PUT,DELETE,HEAD,OPTIONS'});
	res.send();
};

exports.head = function(req, res) {
	res.send(204);
};

exports.getAll = function(req, res) {

	parseService.getObjects(className)
		.then(function(data) {
			res.send(data);
		}, function(data) {
			res.send(data);
		});
};

exports.get = function(req, res) {

	var id = req.params.id;
	parseService.getObject(className, id)
		.then(function(data) {
			res.send(data);
		}, function(data) {
			res.send(data);
		});
};

exports.add = function(req, res) {
	var wine = req.body;

	parseService.addObject(className, wine)
		.then(function(data) {
			res.send(data);
		}, function(data) {
			res.send(data);
		});
};

exports.update = function(req, res) {
	var wine = req.body;
	var id = req.params.id;

	var validationErrors = validationService.validate([
		{ type: 'objectId', field: 'id', value: id, required: true },
		{ type: 'string', field: 'wine.name', value: wine.name, required: false },
		{ type: 'number', field: 'wine.year', value: wine.year, required: false }
	]);

	if (validationErrors.length) {
		res.send(400, { errors: validationErrors });
	} else {

		// safe to perform update
		parseService.updateObject(className, id, wine)
			.then(function(data) {
				res.send(data);
			}, function(data) {
				res.send(data);
			});

	}
};

exports.delete = function(req, res) {
	var id = req.params.id;
	
	parseService.deleteObject(className, id)
		.then(function(data) {
			res.send(data);
		}, function(data) {
			res.send(data);
		});
};
