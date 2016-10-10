var
	express = require('express'),
	app = express(),
	ejs = require('ejs'),
	ejsLayouts = require('express-ejs-layouts'),
	mongoose = require('mongoose'),
	flash = require('connect-flash'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	passport = require('passport'),
	passportConfig = require('./config/passport.js'),
	userRoutes = require('./routes/users.js'),
	User = require('./models/User.js'),
  dotenv = require('dotenv').load({silent: true})


var port = process.env.PORT || 3000

mongoose.connect('mongodb://localhost/project-3', function(err){
  	if(err) return console.log('Cannot connect to Mongo')
  	console.log('Connected to MongoDB. Hell Yeah!')
})

app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(session({
	secret: 'gaboom',
	cookie: {maxAge: 6000000},
	resave: true,
	saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

// ejs configuration
app.set('view engine', 'ejs')
app.use(ejsLayouts)

//root route for now. Later can change it to the game page
app.get('/', function(req,res){
	res.render('index')
})

// all user routes:
app.use('/', userRoutes)

app.listen(port, function(){
	console.log("Server running on port: ", port)
})
