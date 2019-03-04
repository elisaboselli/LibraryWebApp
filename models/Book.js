var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
  isbn: String,
  title: String,
  author: String,
  publisher: String,
  synopsis: String,
  autoconclusive: Boolean,
  tome: String,
  purchase_date: { type: Date, default: Date.now},
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Book', BookSchema);
