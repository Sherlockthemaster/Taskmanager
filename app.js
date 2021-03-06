
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
 

var app = express();
var MemStore = express.session.MemoryStore;
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade'); 
  app.use(express.favicon());  
  app.use(express.logger('dev'));
  app.use(express.methodOverride());	
  app.use(express.bodyParser());  
  app.use(express.cookieParser('your secret here'));
  app.use(express.session({secret: 'alessios', store: MemStore({
    reapInterval: 60000 * 10
  })}));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));     
  app.use(require('stylus').middleware(__dirname + '/public'));  

});

app.configure('development', function(){
  app.use(express.errorHandler());
});

//app.get('/', function(req, res) {
	//res.render('index', {title : 'My Site'})
//});
app.get('/', routes.index);
app.post('/signup', routes.signup);
app.post('/posttask', user.posttask);
app.get('/home', user.home);

//app.get('/post', user.addtask);
//app.get('/display', user.display);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
