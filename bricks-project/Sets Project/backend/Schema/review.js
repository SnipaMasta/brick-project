const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    review: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
    }

})


const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
