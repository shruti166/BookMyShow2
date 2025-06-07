const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,  // in minutes
        required: true
    },
    language: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    posterUrl: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0
    }
}, {
    timestamps: true
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;