var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session=require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/admin');
var loginRouter= require('./routes/login');
var c1Router=require('./routes/c1');
var c2Router=require('./routes/c2');
var c3Router=require('./routes/c3');
var c4Router=require('./routes/c4');
var c5Router=require('./routes/c5');
var c6Router=require('./routes/c6');
var c7Router=require('./routes/c7');
var c8Router=require('./routes/c8');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:1000*60*30},
    rollig:true
}))

app.use('/', indexRouter);
app.use('/admin', usersRouter);
app.use('/login',loginRouter);
app.use('/c1',c1Router);
app.use('/c2',c2Router);
app.use('/c3',c3Router);
app.use('/c4',c4Router);
app.use('/c5',c5Router);
app.use('/c6',c6Router);
app.use('/c7',c7Router);
app.use('/c8',c8Router);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// figure out the login state
app.use(function(req,res,next){
    if(req.session.admin||req.session.judge)
        next();
    else
        res.render('index');
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
