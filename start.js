require('dotenv').config();

var mongoose = require('mongoose');

// useMongoClient is not necessary, but URL string parser is deprecated, so useNewUrlParser->true
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
mongoose.Promise = global.Promise; // because mongoose's default promise is deprecated
mongoose.connection
  .on('connected', () => console.warn('connected'))
  .on('error', (err) => console.warn(`connection error: ${err}`));

require('./models/Registration');

var app = require('./app');
var server = app.listen(3000, () => console.log(`listening...${server.address().port}`));