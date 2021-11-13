require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Book = require ('./bookmodel.js');
const app = express();
app.use(cors());
app.use(express.json())

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongoose is connected')
});

const PORT = process.env.PORT

app.get('/', (req, res) => res.send('hello'));
app.get('/books', handleBooks);
app.delete('/books/:id', handleDeleteBooks);
app.post('/books', handlePostBooks);
app.put('/books/:id', handlePutBooks);

async function handleBooks (req,res){
    const email = req.query.email;
  try {
    let booksFromDB = await Book.find({email: email});
    if (booksFromDB) {
    res.status(200).send(booksFromDB);
    } else {
      res.status(404).send('no books for you');
    } 
  } catch (e) {
      console.error(e);
      res.status(500).send('server error')
    }
  }

async function handlePostBooks(req,res) {

  const newBook = { ...req.body, email: req.query.email}
  try {
    let successBook = await Book.create(newBook);
    if (successBook) {
      res.status(200).send(successBook);
    } else {
      res.status(404).send('no books for you');
    }
  } catch (e) {
    console.error(e);
    res.status(500).send('server error')
  }
}

async function handleDeleteBooks(req,res){
  const id = req.params.id
  const email = req.query.email;
  try {
    const book = await Book.findOne({_id: id, email: email}); 
    if (!book) {
     res.status(400).send('No have');
    } else {
      await Book.findByIdAndDelete(id);
      res.status(200).send('Deleted Book')
    }
    } catch (e) {
    console.error(e);
    res.status(500).send('server error')
  }
}

async function handlePutBooks(req, res) {
  const id = req.params.id;
  const updatedData = { ...req.body, email: req.query.email }
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, updatedData, { new: true, overwrite: true });
    res.status(200).send(updatedBook)
  } catch (e) {
    console.log(e);
    res.status(500).send('server error');
  }

}


app.listen(PORT,() =>console.log(`im listening on ${PORT}`))