const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema({
    userFrom : {
        type : Schema.Types.ObjectId,   // User.js Model을 참조한다!
        ref : 'User'
    },
    movieId : {
        type : String
    },
    movieTitle : {
        type : String
    },
    moviePost : {
        type : String
    },
    movieRunTime : {
        type : String
    }
}, { timestamps : true })

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite }