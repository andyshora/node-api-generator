var p = require('../lib/parse-REST-functions');

var className = 'wines';

exports.findAll = function(req, res) {

	p.getObjects('wines')
		.then(function(data) {
			res.send(data);
		}, function(data) {
			res.writeHead(500, {'Content-Type': 'text/plain'});
			res.send('error: ' + err);
		});
};

exports.findById = function(req, res) {

	var id = req.params.id;
	p.getObject('wines', id)
		.then(function(data) {
			res.send(data);
		}, function(data) {
			res.writeHead(500, {'Content-Type': 'text/plain'});
			res.send('error: ' + err);
		});
};

exports.addWine = function(req, res) {
	var wine = req.body;

	p.addObject('wines', wine)
		.then(function(data) {
			res.send(data);
		}, function(data) {
			res.writeHead(500, {'Content-Type': 'text/plain'});
			res.send('error: ' + err);
		});
};

exports.updateWine = function(req, res) {
	var wine = req.body;
	var id = req.params.id;

	p.updateObject('wines', id, wine)
		.then(function(data) {
			res.send(data);
		}, function(data) {
			res.writeHead(500, {'Content-Type': 'text/plain'});
			res.send('error: ' + err);
		});
};

exports.deleteWine = function(req, res) {
	var id = req.params.id;
	
	p.deleteObject('wines', id)
		.then(function(data) {
			res.send({ success: true, objectId: id });
		}, function(data) {
			res.writeHead(500, {'Content-Type': 'text/plain'});
			res.send('error: ' + err);
		});
};