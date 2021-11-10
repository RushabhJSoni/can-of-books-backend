'use strict';
const mongoose = require('mongoose');

// make a new instance of a schema and define the shape of your data record

// Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.

// see mongoose for more 'types' of values https://mongoosejs.com/docs/schematypes.html

const bookSchema = new mongoose.Schema({
  title:String,
  description: String,
  status: String,
  email : String
});

// create a model to export that you will use to make all instances of this collection

const Book = mongoose.model('Books', bookSchema);

module.exports =  Book;