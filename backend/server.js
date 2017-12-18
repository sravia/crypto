require('dotenv').config({path: '../.env'})

var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var path = require('path');
var methodOverride = require('method-override')
var logger = require('express-logger');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var UserModel = require('./models/user');

require("fs").readdirSync(require("path").join(__dirname, "modules")).forEach(function(file) {
  require("./modules/" + file);
});

mongoose.connect(process.env.MONGO_URL);

app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.use(logger({path: "logs.txt"}));

require('./config/passport')(passport);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(cookieParser());

app.use(session({
    secret: 'elena',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/user', require('./routes/user/auth'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(port);
console.log('The magic happens on port ' + port);
