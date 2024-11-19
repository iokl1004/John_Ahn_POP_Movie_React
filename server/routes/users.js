const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastName: req.user.lastName,
        role: req.user.role,
        image: req.user.image,
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true,
                        userId: user._id,
                        isAuth: user.isAuth,
                        email : user.email,
                        name: user.name,
                        lastName : user.lastName,
                        image : user.image
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

// 회원정보 수정 
router.post("/modify", (req, res) => {

    // 비밀번호 암호화
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    User.findOneAndUpdate({ _id: req.body._id }, {
            name: req.body.name,
            lastName: req.body.lastName,
            password : hash
        }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

// 회원 탈퇴
router.delete("/drop", (req, res) => {

    console.log(req.body.userId);
    User.remove({ _id: req.body.userId }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true });
    });
});

module.exports = router;
