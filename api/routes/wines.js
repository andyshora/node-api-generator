var Kaiseki = require('../lib/kaiseki');

// instantiate
var APP_ID = 'uX77K4d7z4PnWODj6Rr1YkJwAIsFHQp4aMeDa4mm';
var REST_API_KEY = 'xIfE9g6vDdZMvA6nYxF0kfuVnbyswUO2AlY159T7';

var parse = new Kaiseki(APP_ID, REST_API_KEY);
var className = 'wines';

exports.findAll = function(req, res) {
	// res.send([{name:'wine1'}, {name:'wine2'}, {name:'wine3'}]);

	parse.getObjects('wines', function(err, response, body, success) {
		if (err) {
			res.writeHead(500, {'Content-Type': 'text/plain'});
			res.send('error: ' + err);
		} else {
			console.log('all wines = ', body);
			res.send(body);
		}
	});
};

exports.findById = function(req, res) {
	var id = req.params.id;
	console.log('Retrieving wine: ' + id);

	var queryParams = {};
	
	parse.getObject(className, id, queryParams, function(err, response, body, success) {
		
		if (err) {
			res.writeHead(500, {'Content-Type': 'text/plain'});
			res.send('error: ' + err);
		} else {
			console.log('object retrieved = ', body);
			res.send(body);
		}
	});
}

exports.addWine = function(req, res) {
	var wine = req.body;
	console.log('Adding wine: ' + JSON.stringify(wine));
	
	parse.createObject(className, wine, function(err, response, body, success) {
		
		if (err) {
			res.writeHead(500, {'Content-Type': 'text/plain'});
			res.send('error: ' + err);
		} else {
			console.log('object created = ', body);
			console.log('object id = ', body.objectId);
			res.send(body);
		}
	});
}

exports.updateWine = function(req, res) {
	var wine = req.body;
	var id = req.params.id;
	console.log('Updating wine: ' + JSON.stringify(wine));
	
	parse.updateObject(className, id, wine, function(err, response, body, success) {
		
		if (err) {
			res.writeHead(500, {'Content-Type': 'text/plain'});
			res.send('error: ' + err);
		} else {
			console.log('object updated = ', body);
			res.send(body);
		}
	});
}

exports.deleteWine = function(req, res) {
	var id = req.params.id;
	console.log('Deleting wine: ' + id);
	
	parse.deleteObject(className, id, function(err, response, body, success) {
		
		if (err) {
			res.writeHead(500, {'Content-Type': 'text/plain'});
			res.send('error: ' + err);
		} else {
			console.log('object deleted = ', body);
			res.send({ success: true, objectId: id });
		}
	});
}