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
    MongoStore = require('connect-mongo')(session),
    passport = require('passport'),
    passportConfig = require('./config/passport.js'),
    usersRouter = require('./routes/usersRouter.js'),
    gamesRouter = require('./routes/gamesRouter.js'),
    User = require('./models/User.js'),
    Game = require('./models/Game.js'),
    dotenv = require('dotenv').load({silent: true}),
    methodOverride = require('method-override')



var port = process.env.PORT || 3000
var mongoConnectionString = 'mongodb://localhost/passport-authentication'

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
	saveUninitialized: false,
  store: new MongoStore({url: mongoConnectionString})
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())//flash application

//this will add a currentUser to be available in every view
app.use(function(req,res,next){
  if(req.user) req.app.locals.currentUser = req.user
  req.app.locals.loggedIn = !!req.user
  next()
})

// ejs configuration
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.static(__dirname + '/public'))

//root route for now. Later can change it to the game page
app.get('/', function(req,res){
	res.render('login')
})

// all user routes:
app.use('/', usersRouter, gamesRouter)

// all games routes
// app.use('/games', gamesRouter)

app.listen(port, function(){
	console.log("Server running on port: ", port)
})
