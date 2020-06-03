const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const compression = require('compression');

require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger('dev'));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

mongoose
	.connect(
		`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ds247688.mlab.com:47688/heroku_6lxgl9r2` ||
			'mongodb://localhost/transactions',
		{ useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }
	)
	.then(() => console.log('MongoDB Connected!'))
	.catch((err) => console.log('[ Error ]: ' + err));

app.use(require('./routes/api.js'));

app.listen(PORT, () => {
	console.log(`App running on port ${PORT}!`);
});
