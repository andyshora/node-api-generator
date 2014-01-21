var spec = {};

spec.className = 'wines';

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

module.exports = spec;