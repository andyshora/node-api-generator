// instantiate
var APP_ID = 'ecJYHJ4LGkoibPx1PqQMt7Kp8nqVGi8FDsOJUmaP';
var REST_API_KEY = 'NFc3uPobU9lIcDGV8neQNSebkR5tplJTqRyuSgvT';

var Kaiseki = require('./kaiseki'),
	Q = require('q');

var parse = new Kaiseki(APP_ID, REST_API_KEY);

module.exports = {
	getObject: function (className, id) {
		var deferred = Q.defer();
		parse.getObject(className, id, {}, function(err, response, body, success) {
			if (success) {
				deferred.resolve(body);
			} else if (err) {
				deferred.reject(500);
			} else if (body.error) {
				deferred.reject(404);
			} else {
				deferred.reject(500);
			}
		});
		return deferred.promise;
	},
	getObjects: function (className) {
		var deferred = Q.defer();
		parse.getObjects(className, function(err, response, body, success) {
			if (success) {
				deferred.resolve(body);
			} else if (err) {
				deferred.reject(500);
			} else if (body.error) {
				deferred.reject(404);
			} else {
				deferred.reject(500);
			}
		});
		return deferred.promise;
	},
	addObject: function (className, newData) {
		var deferred = Q.defer();
		parse.createObject(className, newData, function(err, response, body, success) {
			if (success) {
				deferred.resolve(body);
			} else if (err) {
				deferred.reject(500);
			} else if (body.error) {
				deferred.reject(404);
			} else {
				deferred.reject(500);
			}
		});
		return deferred.promise;
	},
	updateObject: function (className, id, updateData) {
		var deferred = Q.defer();
		parse.updateObject(className, id, updateData, function(err, response, body, success) {
			if (success) {
				deferred.resolve(body);
			} else if (err) {
				deferred.reject(500);
			} else if (body.error) {
				deferred.reject(404);
			} else {
				deferred.reject(500);
			}
		});
		return deferred.promise;
	},
	deleteObject: function (className, id) {
		var deferred = Q.defer();
		parse.deleteObject(className, id, function(err, response, body, success) {
			if (success) {
				deferred.resolve(204);
			} else if (err) {
				deferred.reject(500);
			} else if (body.error) {
				deferred.reject(404);
			} else {
				deferred.reject(500);
			}
		});
		return deferred.promise;
	}
};

