// <!-- Project Foundation  
// This project was built using a template as a starting point and customized to fit the app’s unique features and design.  
// All final code and design choices were reviewed, tested, and implemented by the author.
//  -->

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://leeanneeagan_db_user:lW9mzmaTlUQyRY9Z@cluster0.widu55j.mongodb.net/wanderwall?appName=Cluster0";
const dbName = "wanderwall";

/// multer is for photos addition
const multer = require('multer')
const path = require('path')

//photo storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/') // save images in public/uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

//connect to mongodb
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if(error) {
        throw error;
    }
    db = client.db(dbName);
    console.log("Connected to `" + dbName + "`!");

    // Start server only after DB connection
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {messages: result})
  })
})

app.post('/messages', upload.single('photo'), (req, res) => {
  db.collection('messages').insertOne({
    name: req.body.name,
    msg: req.body.msg,
    photo: req.file ? `/uploads/${req.file.filename}` : null // optional photo
  }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

// app.post('/messages', (req, res) => {
//   db.collection('messages').insertOne({name: req.body.name, msg: req.body.msg, thumbUp: 0, thumbDown:0}, (err, result) => {
//     if (err) return console.log(err)
//     console.log('saved to database')
//     res.redirect('/')
//   })
// })


//deleted thumbs up thumbs down for PUT(update) for edit text in data base
app.put('/messages', (req, res) => {
  db.collection('messages')
    .findOneAndUpdate(
      { name: req.body.name, msg: req.body.oldMsg }, 
      { $set: { msg: req.body.newMsg } },            
      { returnDocument: 'after', upsert: false }    
    )
    .then(result => res.json('Message updated')) 
    .catch(err => res.status(500).json(err))       
})



app.delete('/messages', (req, res) => {
  db.collection('messages').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
