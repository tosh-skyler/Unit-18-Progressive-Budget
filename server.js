const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const compression = require('compression');

const PORT = 3000;

const app = express();

app.use(logger('dev'));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

require('dotenv').config();


mongoose
	.connect(
		`mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0-3pcpg.mongodb.net/test?retryWrites=true&w=majority`,
		{ useUnifiedTopology: true, useNewUrlParser: true }
	)
	.then(() => console.log('M O N G O D B   C O N N E C T E D . . .'))
	.catch((err) => console.log('[ E R R O R ]: ' + err));

// server-sent event stream
app.get('/events', function(req, res) {
	res.setHeader('Content-Type', 'text/event-stream');
	res.setHeader('Cache-Control', 'no-cache');

	// send a ping approx every 2 seconds
	var timer = setInterval(function() {
		res.write('data: ping\n\n');

		// !!! this is the important part
		res.flush();
	}, 2000);

	res.on('close', function() {
		clearInterval(timer);
	});
});

// routes
app.use(require('./routes/api.js'));

app.listen(PORT, () => {
	console.log(`App running on port ${PORT}!`);
});
