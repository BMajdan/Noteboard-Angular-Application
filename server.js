/* Import modules */
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const mongoose = require('mongoose');

/* Connect to Database */
mongoose.connect('mongodb://localhost:27017/BoardDatabase');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("Połaczono z baza danych")
});

/* Create Database */
var boardSchema = mongoose.Schema({
    name: String
});

var notesSchema = mongoose.Schema({
	title: String,
	text: String,
	left: String,
	top: String,
    width: String,
    height: String,
	zIndex: String,
	id: String,
	boardName: String
})

var Board = mongoose.model('Board', boardSchema);
var Note = mongoose.model('Note', notesSchema);

/*Configure routing server */
var publicPath = path.resolve(__dirname, 'core');
app.use(express.static(publicPath));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res){
    res.sendFile('index.html');
});


/* Manage Database */

app.post('/api/boardService/createBoard', function (req, res) {
	Board.findOne({name: req.body.boardName}, function(err,obj) { 
		if(obj == null){
			Board.create({name: req.body.boardName}, function(err, doc) {
    			var resendObject = {
    				createStatus: true,
    				boardName: req.body.boardName,
    				message: 'Tablica została stworzona'
    			}
    			res.json(resendObject);
			});
		}else{
			var resendObject = {
    			createStatus: false,
    			boardName: req.body.boardName,
    			message: 'Tablica już istnieje'
    		}
    		res.json(resendObject);
		}
	});
});

app.post('/api/boardService/checkCreated', function (req, res) {
    Board.findOne({name: req.body.boardName}, function(err,obj) { 
        if(obj == null){
            var resendObject = {
                checkStatus: false,
                message: 'Tablica nie istnieje'
            }
            res.json(resendObject);
        }else{
            var resendObject = {
                checkStatus: true,
                boardName: req.body.boardName,
                message: 'Tablica już istnieje'
            }
            res.json(resendObject);
        }
    });
});

app.post('/api/boardService/createNote', function (req, res) {
	Note.create(req.body.note, function(err, doc) {
    	var resendObject = {
    		createStatus: true,
    		message: 'Notatka została dodana'
    	}
    	res.json(resendObject);
	});
});

app.post('/api/boardService/loadNotes', function (req, res) {
    Note.find({ 'boardName': req.body.boardName }, function (err, docs) {
        var resendObject = {
            loadStatus: true,
            notes: docs,
            message: 'Notatki zostały załadowane'
        }
        res.json(resendObject);
    });
});

app.post('/api/boardService/deleteNote', function (req, res) {
    Note.remove({ 'boardName': req.body.boardName, 'id': req.body.id  }, function (err, docs) {
        var resendObject = {
            deleteStatus: true,
            message: 'Notatka została usunięta'
        }
        res.json(resendObject);
    });
});

app.post('/api/boardService/updateNote', function (req, res) {
    var conditions = { 'boardName': req.body.boardName, 'id': req.body.id }
      , update = req.body
      , options = { multi: true };

    Note.update(conditions, update, options, callback);

    function callback (err, numAffected) {
        console.log(err, numAffected)
        var resendObject = {
            updateStatus: true,
            message: 'Notatka została zaktualizowana'
        }
        res.json(resendObject);
    }
});


app.listen(3000, () => console.log('Example app listening on port 3000!'))