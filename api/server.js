var express = require('express'),
	wine = require('./routes/wines'),
	wine = require('./routes/cheeses');
 
var app = express();

app.configure(function () {
	app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
	app.use(express.bodyParser());
});
 
app.get('/wines', wine.getAll);
app.get('/wines/:id', wine.get);
app.post('/wines', wine.add);
app.put('/wines/:id', wine.update);
app.delete('/wines/:id', wine.delete);

app.get('/cheeses', wine.getAll);
app.get('/cheeses/:id', wine.get);
app.post('/cheeses', wine.add);
app.put('/cheeses/:id', wine.update);
app.delete('/cheeses/:id', wine.delete);
 
app.listen(3000);
console.log('Listening on port 3000...');
