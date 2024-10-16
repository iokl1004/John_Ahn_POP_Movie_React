const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

// req에는 Favorite.js 파일에서 Axios를 통하여 전달해준 아래의 값들이 담겨져 있다.
// let variables = {
//     userFrom,
//     movieId
// }
// Axios.post('/api/favorite/favoriteNumber', variables)
// body란? index.js 파일을 보면 bodyParser 를 이용하여 프론트에서 보내준 movieId를 받을 수 있다!

router.post('/favoriteNumber', (req, res) => {
    // mongoDB에서 favorite 숫자를 가져오기
    Favorite.find({ "movieId" : req.body.movieId })
    .exec(( err, info) => {
        if(err) return res.status(400).send(err)
        // 그 다음에 프론트에 다시 숫자 정보를 보내주기
        res.status(200).json ({ success : true, favoriteNumber : info.length })
    })
})

router.post('/favorited', (req, res) => { 
    // 내가 이 영화를 Favorite 리스트에 넣었는지 정보를 DB에서 가져오기.
    Favorite.find({ "movieId" : req.body.movieId, "userFrom" : req.body.userFrom })
    .exec(( err, info) => {
        if(err) return res.status(400).send(err)
        // 그 다음에 프론트에 다시 숫자 정보를 보내주기

        let result = false;
        
        // 내가 아직 페이보릿 영화를 넣었다면 true값 반환!
        if(info.length !== 0 ) {
            result = true
        }
        
        res.status(200).json ({ success : true, favorited : result})
    })
})

// 해당 무비를 Favorite 했을 경우, Favorite을 지운다!
router.post('/removeFromFavorite', (req, res) => { 
    Favorite.findOneAndDelete({ movieId : req.body.movieId, userFrom : req.body.userFrom })
    .exec(( err, doc) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json({ success:true, doc })
    })
})

// 해당 무비를 Favorite 하지 않은 상태인 경우, Favorite을 한다!
router.post('/addToFavorite', (req, res) => { 
    // 도큐먼트 인스턴스 생성
    const favorite = new Favorite(req.body)

    favorite.save((err, doc) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json({ success : true })
    })

})

// favorite 페이지 정보 가져오기
router.post('/getFavoredMovie', (req, res) => { 
    Favorite.find({ 'userFrom' : req.body.userFrom })
    .exec((err, favorites) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json({ success : true, favorites})
    })
})

// Favorite 삭제
router.post('/removeFromFavorite', (req, res) => { 
    Favorite.findOneAndDelete({ movieId : req.body.movieId, userFrom : req.body.userFrom })
    .exec(( err, result ) => {
        if(err) return res.status(400).send(err)
            return res.status(200).json({ success : true })
    })
})
module.exports = router;