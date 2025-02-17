const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = mongoose.Schema({
    userId : {
          type : Schema.Types.ObjectId
        , ref:'User'
    },
    commentId : {
          type : Schema.Types.ObjectId
        , ref:'Comment'
    },
    movieId : {
          type : String
        , ref:'Movie'
    }

}, { timestamps : true })   // 데이터를 만든 시각을 저장한다



const Like = mongoose.model('Like', likeSchema);

module.exports = { Like }