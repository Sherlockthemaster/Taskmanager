exports.index = function (req, res) {
	res.render('index', {title : ""})
};


exports.signup = function(request, res) {
	// get username and password values	 
        /*var body = '';
        request.on('data', function (data) {
            body += data;
			console.log(body);
        });
        request.on('end', function () {
            var POST = qs.parse(body);
            // use POST
        });
		res.end("bye"); */
	var uname = request.body.user.name;
	var pwd = request.body.user.password;
	console.log(uname);
	console.log(pwd);
	Authenticate(uname,pwd, res, HandleAuthResponse);	
	// connect to db 
	// chk if they exist in db 
	// redirect to /home is successful
	// redirect to / if fails with message to tht login details are incorrect
};

function Authenticate(uname, pass,res,  callBack) {
	var databaseUrl = "taskmanager"; // "username:password@example.com/mydb"
	var collections = ["users"];
	var db = require("mongojs").connect(databaseUrl, collections);
	console.log("Entered Authenticate");
	db.users.find({}, function(err, users) {
		if( err || !users) console.log("Some Error ");
		else {
			console.log("found some users");
			users.forEach( function(user) {
				if(user.uname === uname){
					console.log("uname match");
					console.log("entered pwd : " + pass + "found : " + user.password);
					if(user.password == pass){
						console.log("pwd match");
						HandleAuthResponse(res, 1);
					}
					else{
						HandleAuthResponse(res, 0);
					}
				}
				else{
					console.log('found a user' + user.uname);
				}
			});
		}
	});		
}

function HandleAuthResponse(res,success){
	console.log("Entered auth response ");
	if(success == 1) {
		res.redirect('/home');
	}
	else{
		res.redirect('/');
	}
}