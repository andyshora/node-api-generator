var parseService = require('../lib/parse-promises');

var className = 'cheeses';

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

	parseService.updateObject(className, id, wine)
		.then(function(data) {
			res.send(data);
		}, function(data) {
			res.send(data);
		});
};

exports.delete = function(req, res) {
	var id = req.params.id;
	
	parseService.deleteObject(className, id)
		.then(function(data) {
			res.send({ success: true, objectId: id });
		}, function(data) {
			res.send(data);
		});
};