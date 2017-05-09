var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();
var compress = require('compression');
var port = Number(process.env.PORT || 3001);
var dotenv = require('dotenv');
var auth = require('http-auth');
var compression = require('compression');

if (!process.env.NODE_ENV) {
  // Read .env to properly set `process.env`
  dotenv.config({
    'path': './.env'
  });
}

var env = {
  'development': process.env.NODE_ENV === 'development',
  'production': process.env.NODE_ENV === 'production'
};

app.use(express.static('public'));
app.set('views', './src/server/views');
app.set('view engine', 'ejs');
app.disable('x-powered-by');

if (process.env.COMPRESSION_ENABLED === 'true') {
  app.use(compression());
}

if (process.env.IS_PASSWORD_PROTECTED === 'true') {
  const envUser = process.env.ENV_USER;
  const envPassword = process.env.ENV_PASSWORD;
  const basic = auth.basic({
    'realm': 'Protected'
  }, (username, password, callback) => {
    callback(username === envUser && password === envPassword);
  });
  app.use(auth.connect(basic));
}

app.get('*', function(req, res) {
  res.render('index', {
    'env': env
  });
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  }
});
