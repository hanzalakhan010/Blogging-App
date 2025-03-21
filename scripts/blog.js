var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import getUserName from "./users.js";
let queryString = window.location.href.split("?")[1];
const urlParams = new URLSearchParams(queryString);
const apiKey = "lZE8TZ/P5vjFf8ruEpBU+w==PMRnYSk8dj5A2t5f";
let currentBlog = Number(urlParams.get("id"));
let blog = undefined;
var host = "http://localhost:5555";
// V1 means data is simply fetched over json server
const loadBlog = () => __awaiter(void 0, void 0, void 0, function* () {
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
    let comments = document.getElementById("comments");
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
        blog.comments.forEach((comment) => __awaiter(void 0, void 0, void 0, function* () {
            comments.insertAdjacentHTML("beforeend", `
          <div class='comment'>
            <p>${comment.date}</p>
            <p>${comment.text}</p>
            <p>${yield getUserName(comment.userId)}</p>
            </div>
            `);
        }));
    }
});
function addComment() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        let comment = document.getElementById("commentText");
        let commentText = comment.value;
        let __blog = blog;
        let loginUserID = parseInt(localStorage.getItem("loginUser") || "0");
        let date = new Date().toDateString();
        __blog === null || __blog === void 0 ? void 0 : __blog.comments.push({
            id: ((_a = blog === null || blog === void 0 ? void 0 : blog.comments) === null || _a === void 0 ? void 0 : _a.length) ? blog.comments.length + 1 : 1,
            userId: loginUserID,
            text: commentText,
            date,
        });
        if (commentText) {
            comment.value = '';
            let response = yield fetch(`${host}/blogs/${currentBlog}`, {
                method: "PATCH",
                body: JSON.stringify({ comments: blog === null || blog === void 0 ? void 0 : blog.comments }),
            });
            // let data = await response.json();
            if (response.ok) {
                let commentsDiv = document.getElementById("comments");
                commentsDiv === null || commentsDiv === void 0 ? void 0 : commentsDiv.insertAdjacentHTML('beforeend', `
        <div class='comment'>
            <p>${date}</p>
            <p>${commentText}</p>
            <p>${yield getUserName(loginUserID)}</p>
            </div>
        `);
            }
        }
    });
}
window.loadBlog = loadBlog;
window.addComment = addComment;
