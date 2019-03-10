
var bodyParser = require('body-parser');

var mongoose = require('mongoose');


//connect to the db
mongoose.connect('mongodb+srv://test:test@todo-k1ia6.mongodb.net/test?retryWrites=true');

//create a schema(blue-print)

var todoSchema = new mongoose.Schema({
	item: String
});

//now create a model based on schema
//Todo is the model name of collection and mention the schema type
var Todo = mongoose.model('Todo',todoSchema);
//now we can create itemOne of type Todo and push them to the database

/*
var itemOne= Todo({item: 'buy tulips'}).save(function(err){
	if(err) throw err;
	console.log('item saved');
});
*/


//dummy data
//var data = [{item: 'get milk'},{item:'walk dog'},{item:'kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({ extended: false });



//it is a module which we can export in nodejs file
module.exports = function(app){
	//inside we will set all our request handlers


	app.get('/todo',function(req,res){

		//get data from mongodb and pass it to view
		Todo.find({},function(err,data){ //find all data in collection Todo
			if(err) throw err;
			res.render('todo',{todos: data});

		});
		
		//res.render('todo',{todos: data});


	});


	app.post('/todo',urlencodedParser,function(req,res){

		//get data from view and add it to mongodb

		var newTodo = Todo(req.body).save(function(err,data){
			if(err) throw err;
			res.json({todos:data});
		})

		//data.push(req.body);
		//sending the data back in success: function(data) using json to output in li
		//res.json({todos:data});

	});


	app.delete('/todo/:item',function(req,res){

		//delete the requested item from mongodb
		Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
			if(err) throw err;
			res.json({todos:data});
		})



	/*  -------without db--------
		//compare all the elements of data 
		//elements passed to function under name todo
		data = data.filter(function(todo){ //filter is amethod

			//comparing todo.item with the item to be deleted
			//if true it remains in array else removed;
			//if false filters the item out
			//req.params.item = /todo/:item

			return todo.item.replace(/ /g,'-') !== req.params.item;
		})

		res.json({todos:data});
	*/

	});

}