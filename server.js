const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const compression = require('compression');

require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

// Define Middleware

app.use(logger('dev'));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

mongoose
	.connect(
		process.env.MONGODB_URI ||
			`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds247688.mlab.com:47688/heroku_6lxgl9r2`,
		{
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useFindAndModify: false
		}
	)
	.then(() => console.log('MongoDB Connected!'))
	.catch((err) => console.log('[ Error ]: ' + err));

// routes
app.use(require('./routes/api.js'));

app.listen(PORT, () => {
	console.log(`App running on port ${PORT}!`);
});
