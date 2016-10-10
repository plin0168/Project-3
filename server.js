var
  express = require('express'),
  app = express(),
  ejs = require('ejs'),
  ejsLayouts = require('express-ejs-layouts'),
  mongoose = require('mongoose'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  passport = require('passport'),
  passportConfig = require('./config/passport.js')
  userRoutes = require('./routes/users.js'),
  User = require('./models/User.js')


var port = process.env.PORT || 3000

mongoose.connect('mongod://localhost/passport-authentication', function(err){
  if(err) return console.log('cannot connect. error. error')
  console.log('connected to mongoDB.');
})

//middleware application
app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(session({
  secret:
  cookie:
  resave: true,
  saveUnitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//make currentUser available in every view.
app.use(function(req,res,next){
  if(req.user) req.app.locals.currentUser = req.user
  req.app.locals.logginIn = !!req.user
  next()
})

//ejs configuration
app.set('view engine', 'ejs') //naming 'view engine' as same packaged used to render template
app.use(ejsLayouts)

//root route
app.get('/', function(req,res){
  res.render('index')
})

//all user routes:
app.use('/', userRoutes)



app.listen(port, function(){
  console.log("server is running on port.", port);
})
