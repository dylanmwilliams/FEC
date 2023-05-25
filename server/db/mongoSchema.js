const mongoose = require('mongoose');
const { Schema } = mongoose;

const answersSchema = new Schema({
  body: String,
  date_written: Number,
  answerer_name: String,
  answerer_email: String,
  reported: Boolean,
  helpful: Number,
  photos: [String], // Photos are just an array of URLs
});

const questionsSchema = new Schema({
  body: String,
  date_written: Number,
  asker_name: String,
  asker_email: String,
  reported: Boolean,
  helpful: Number,
  answers: [answersSchema],
});

const productsSchema = new Schema({
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
  questions: [questionsSchema],
});

const Product = mongoose.model('Product', productsSchema);

module.exports = { Product };
