const express = require('express');
const mustache = require('mustache-express');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const mongoURL = 'mongodb://localhost:27017/newdb';
const app = express();
const port = 3000;

app.engine('mustache', mustache());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(express.static(__dirname + '/public'));

app.use('/:username', function (req, res) {
  MongoClient.connect(mongoURL, function (err, db) {
    const robots = db.collection('robots');
    let username = req.params.username;
    robots.find({username: username}).toArray(function (err, docs) {
      res.render('id', {robots: docs});
    });
  });
});

app.use('/', function (req, res) {
  MongoClient.connect(mongoURL, function (err, db) {
    const robots = db.collection('robots');
    robots.find({}).toArray(function (err, docs) {
      res.render('index', {robots: docs});
    });
  });
});

// app.use('/forhire', function (req, res) {
//   MongoClient.connect(mongoURL, function (err, db) {
//     const robots = db.collection('robots');
//     let profileId = req.params.id - 1;
//     robots.findOne({_id: profileId}).toArray(function (err, docs) {
//       res.render('forhire', {robots: docs});
//     });
//   });
// });


app.listen(port, function(){
  console.log('Robo-server initializing...');
});
