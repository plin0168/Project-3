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

//root route for now. Later can change it to the game page
app.get('/', function(req,res){
	res.render('login')
})

// all user routes:
app.use('/', usersRouter)

app.listen(port, function(){
	console.log("Server running on port: ", port)
})
