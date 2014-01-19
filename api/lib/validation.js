var _ = require('underscore');

var _validateString = function(str) {
	return typeof str === 'string' || !str;
};

var _validateNumber = function(num) {
	return typeof num === 'number' || !num;
};

var _validateObjectId = function(str) {
	return ((typeof str === 'string') && (str.length > 0) && (str.length < 30)) || !str;
};


module.exports = {
	validate: function (data) {

		var errors = [];

		_.each(data, function(d) {
			if (!('type' in d && 'value' in d)) {
				errors.push({ message: 'Validation object was not specified correctly.' });
			} else if (d.required && !d.value) {
				errors.push({ field: d.field, value: d.value, type: d.type, message: 'Required field was not specified.' });
			} else if ((d.type === 'string') && !_validateString(d.value)) {
				errors.push({ field: d.field, value: d.value, type: d.type, message: 'String expected, but ' + (typeof d.value) + ' specified.' });
			} else if ((d.type === 'number') && !_validateString(d.value)) {
				errors.push({ field: d.field, value: d.value, type: d.type, message: 'Number expected, but ' + (typeof d.value) + ' specified.' });
			} else if ((d.type === 'objectId') && !_validateObjectId(d.value)) {
				errors.push({ field: d.field, value: d.value, type: d.type, message: 'Invalid objectId specified.' });
			}
		});

		return errors;
	}
};