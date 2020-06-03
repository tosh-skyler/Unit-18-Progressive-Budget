const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const compression = require('compression');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/transactions'

const app = express();

app.use(logger('dev'));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

mongoose
	.connect(MONGODB_URI, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useFindAndModify: false
	})
	.then(() => console.log('MongoDB Connected!'))
	.catch((err) => console.log('[ Error ]: ' + err));

app.use(require('./routes/api.js'));

app.listen(PORT, () => {
	console.log(`App running on port ${PORT}!`);
});
