var express = require('express'),
	wine = require('./routes/wines');
 
var app = express();

app.configure(function () {
	app.use(express.logger('dev'));	/* 'default', 'short', 'tiny', 'dev' */
	app.use(express.bodyParser());
});

app.get('/*', function(req,res,next) {

	res.header('Date', new Date());
	next();
});
 
/* wines */
app.get('/wines', wine.getAll);
app.get('/wines/:id', wine.get);
app.post('/wines', wine.add);
app.put('/wines/:id', wine.update);
app.delete('/wines/:id', wine.delete);
app.options('/wines*', wine.options);
app.head('/wines*', wine.head);
 
app.listen(3000);
console.log('Listening on port 3000...');
