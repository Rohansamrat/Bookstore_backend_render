import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
 name:String,
 price:Number,
 category:String,
 image:String,
 title:String,
});

export const Book = mongoose.model('Book',bookSchema);