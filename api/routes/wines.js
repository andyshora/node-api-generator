var parseService = require('../lib/parse-promises'),
	validationService = require('../lib/validation'),
	_ = require('underscore');

var className = 'wines';

var spec = {};

// create
spec.POST = {
	create: {
		uri: '/wines',
		description: 'Create a new wine record',
		parameters: {
			name: {
				type: 'string',
				description: 'wine name',
				required: true
			},
			year: {
				type: 'number',
				description: 'wine year',
				required: true
			}
		},
		example: {
			name: 'Tintos de Mar',
			year: 2005
		}
	}
};

// read
spec.GET = {
	single: {
		uri: '/wines/:id',
		description: 'Get a single wine record',
		parameters: {
			id: {
				type: 'string',
				url: true,
				description: 'objectId',
				required: true
			}
		},
		example: {}
	},
	all: {
		uri: '/wines',
		description: 'Get all wine records',
		parameters: {},
		example: {}
	}
};

// update
spec.PUT = {
	update: {
		uri: '/wines/:id',
		description: 'Update a wine record',
		parameters: {
			id: {
				type: 'string',
				url: true,
				description: 'objectId',
				required: true
			},
			name: {
				type: 'string',
				description: 'wine name',
				required: true
			},
			year: {
				type: 'number',
				description: 'wine year',
				required: false
			}
		},
		example: {
			id: 'abcde12345',
			name: 'Tintos de Mar',
			year: 2005
		}
	}
};

// delete
spec.DELETE = {
	delete: {
		uri: '/wines/:id',
		description: 'Delete a wine record',
		parameters: {
			id: {
				type: 'string',
				url: true,
				description: 'objectId',
				required: true
			}
		}
	}
};


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
	var wine = req.body;

	parseService.addObject(className, wine)
		.then(function(data) {
			res.send(data);
		}, function(data) {
			res.send(data);
		});
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
