const express = require("express");
// multer 是用来处理上传文件的模块
const multer = require("multer");
// 文件上传之后保存的路径, 这个路径希望做成可以配置的, 所以就写入到 config 中
const { uploadPath } = require("../config");

// 配置 multer 模块
// dest 表示文件上传之后保存的路径
const upload = multer({
    dest: uploadPath
});

const User = require("../models/user");
const { log } = require("../utils");
const { currentUser, loginRequired } = require("./main");

const main = express.Router();

main.get("/profile/:id", loginRequired, (request, response) => {
    const id = Number(request.params.id);
    const m = User.get(id);
    const args = {
        user: m
    };
    response.render("user/profile.html", args);
});

module.exports = {
    user: main
};
