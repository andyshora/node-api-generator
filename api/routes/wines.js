var parseService = require('../lib/parse-promises'),
	validationService = require('../lib/validation'),
	_ = require('underscore'),
	spec = require('../specs/wines-spec.js');

var className = spec.className;

exports.options = function(req, res) {
	res.set({
		'Allow': 'GET,POST,PUT,DELETE,HEAD,OPTIONS',
		'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,HEAD,OPTIONS'
	});
	res.send(spec);
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
	var requestFields = req.body;

	
	var validationFields = _.map(spec.POST.create.parameters, function(field, key) {
		var val = ('url' in field && field.url) ?  req.params[key] : requestFields[key];
		return { type: field.type, field: key, value: val, required: field.required };
	});

	var validationErrors = validationService.validate(validationFields);

	if (validationErrors.length) {
		res.send(400, { errors: validationErrors });

	} else {

		// safe to perform add
		parseService.addObject(className, requestFields)
			.then(function(data) {
				res.send(data);
			}, function(data) {
				res.send(data);
			});

	}
};

exports.update = function(req, res) {
	var requestFields = req.body;
	var id = req.params.id;


	var validationFields = _.map(spec.PUT.update.parameters, function(field, key) {
		var val = ('url' in field && field.url) ?  req.params[key] : requestFields[key];
		return { type: field.type, field: key, value: val, required: field.required };
	});

	var validationErrors = validationService.validate(validationFields);

	if (validationErrors.length) {
		res.send(400, { errors: validationErrors });

	} else {

		// safe to perform update
		parseService.updateObject(className, id, requestFields)
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
