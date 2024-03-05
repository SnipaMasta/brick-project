const {Schema, model } = require('mongoose');

const reviewSchema = new Schema({
    reviewText: {
        type: String,
        required: 'You need to leave a review!',
        minlength: 1,
        maxlength: 280,
    },
    reviewAuthor: {
        type: String,
        required: true,
    },
    legoSet: {
        type: String,
        required: true,
    },
    reviewScore: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    }
    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    //     get: (timestamp) => dateFormat(timestamp),
    // },
    })
    reviewSchema.set('timestamps', true)

const Review = model('Review', reviewSchema);

module.exports = Review;
