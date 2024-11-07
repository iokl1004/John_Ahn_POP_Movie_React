const express = require('express');
const router = express.Router();

const { Comment } = require("../models/Comment");

// Comment

// 댓글 저장
router.post('/saveComment', (req, res) => {
    const comment = new Comment(req.body)   // 모든 클라이언트 정보를 가져온다!

    // MongoDB 저장
    comment.save(( err, comment ) => {
        if(err) return res.json({ success : false, err })
        Comment.find({ '_id' : comment._id })
               .populate('writer')
               .exec ( (err, result) => {
                if(err) return res.json({ success : false, err })
                    res.status(200).json({ success : true, result })
               })
    })
})

// 해당 영상의 댓글 가져오기
router.post("/getComments", (req, res) => {
    Comment.find({ movieId : req.body.movieId })
    .populate("writer")
    .exec(( err, comments) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success : true, comments});
    });
});

// 대댓글의 갯수 확인
router.post("/getReplyComment", (req, res) => {
    console.log(req.body)
    Comment.find({ movieId : req.body.movieId, responseTo : req.body.commentId }).count() 
    .populate("writer")
    .exec(( err, replyCommentCount) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success : replyCommentCount });
    });
});

module.exports = router;