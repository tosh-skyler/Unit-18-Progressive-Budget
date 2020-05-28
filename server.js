const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const compression = require('compression');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger('dev'));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

require('dotenv').config();

mongoose
	.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", { 
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  
  })
	.then(() => console.log('M O N G O D B   C O N N E C T E D . . .'))
	.catch((err) => console.log('[ E R R O R ]: ' + err));

// routes
app.use(require('./routes/api.js'));

app.listen(PORT, () => {
	console.log(`App running on port ${PORT}!`);
});
