"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let queryString = window.location.href.split("?")[1];
const urlParams = new URLSearchParams(queryString);
const apiKey = "lZE8TZ/P5vjFf8ruEpBU+w==PMRnYSk8dj5A2t5f";
let currentBlog = Number(urlParams.get("id"));
let blog = undefined;
let host = "https://studious-carnival-644w6rgwr9p2rq9q-5555.app.github.dev";
// V1 means data is simply fetched over json server
const loadBlog = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`${host}/blogs/${currentBlog}`);
    try {
        let response = yield fetch(`${host}/blogs/${currentBlog}`);
        let data = yield response.json();
        if (data) {
            blog = data;
        }
    }
    catch (err) {
        yield loadBlogV2();
    }
    finally {
        renderBlog();
    }
});
// V2 means data is fetched through our way and this route is only taken when json server is not working
const loadBlogV2 = () => __awaiter(void 0, void 0, void 0, function* () {
    let response = yield fetch("../data/db.json");
    let data = yield response.json();
    if (data) {
        blog = data.blogs.find((blog) => blog.id === currentBlog);
    }
});
// V2 _____________________________________________________________________________________________________
const loremText = (para) => __awaiter(void 0, void 0, void 0, function* () {
    let response = yield fetch(`https://api.api-ninjas.com/v1/loremipsum?paragraphs=${para}`, {
        headers: {
            "X-Api-Key": apiKey,
        },
    });
    let data = yield response.json();
    if (data && blog) {
        blog.content += data.text.split(".").join("<br>");
    }
});
const renderBlog = () => __awaiter(void 0, void 0, void 0, function* () {
    // await loremText(10)
    let header = document.getElementById("header");
    let content = document.getElementById("content");
    let comments = document.getElementById('comments');
    if (header && blog) {
        header.innerHTML = `
    <h1>${blog === null || blog === void 0 ? void 0 : blog.title}</h1>
    <p><u>Date: ${blog === null || blog === void 0 ? void 0 : blog.date}</u></p>
    <span>likes : ${blog.likes}</span>
    <span>Shares : ${blog.shares}</span>
    `;
    }
    if (content && blog) {
        content.innerHTML = `
    <p>${blog === null || blog === void 0 ? void 0 : blog.content}</p>
    <div class = 'comments'>
    `;
    }
    if (blog && comments) {
        blog.comments.forEach((comment) => {
            comments.insertAdjacentHTML('beforeend', `
          <div>
            <p>${comment.date}</p>
            <p>${comment.text}</p>
          </div>
        `);
        });
    }
});
function addComment() {
    let comment = document.getElementById('commentText');
    let commentText = comment.value;
    if (commentText) {
    }
}
loadBlog();
