
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.posttask = function(req, res) {
	var databaseUrl = "taskmanager"; // "username:password@example.com/mydb"
	var collections = ["users", "tasks"];
	var db = require("mongojs").connect(databaseUrl, collections);
	// add the task to db and redirect to the /home page . the task list will be updated by then
	// btw use session to store current username 
	
}
	

exports.home = function(req, res) {
	var databaseUrl = "taskmanager"; // "username:password@example.com/mydb"
	var collections = ["users", "tasks"];
	var db = require("mongojs").connect(databaseUrl, collections);
	console.log("Entered hme ");
	db.tasks.find({user:"sherlock"}, function(err, tasklist) {
		if(err || !tasklist) 
			console.log("error or nmo data ");
		else { 
			console.log("found some data");
			res.render('home', {data: tasklist});	
			/*tasklist.forEach(function(task) {
				console.log(task.desc);
			});*/
		}		
				
	});
	console.log("ending home");
	
}