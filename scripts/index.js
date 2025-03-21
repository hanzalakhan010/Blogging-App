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
// V1 means data is simply fetched over json server
let blogs = [];
var host = "http://localhost:5555";
function loadBlogsV1() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let response = yield fetch(`${host}/blogs`);
            let data = yield response.json();
            if (data) {
                blogs = data;
            }
        }
        catch (err) {
            yield loadBlogsV2();
            console.log('from v2');
        }
        finally {
            renderBlogs();
        }
    });
}
// _____________________________________________________________________________________________________
// V2 means data is fetched through our way and this route is only taken when json server is not working
function loadBlogsV2() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch("../data/db.json");
        let data = yield response.json();
        if (data) {
            blogs = data.blogs;
        }
    });
}
// _____________________________________________________________________________________________________
const renderBlogs = () => {
    console.log(blogs.length);
    blogs.forEach((blog) => {
        let blogsDiv = document.getElementById("blogs");
        blogsDiv === null || blogsDiv === void 0 ? void 0 : blogsDiv.insertAdjacentHTML("beforeend", `
                <div class = 'blog'>
                    <div class = 'tagsDiv'>
                      ${blog.tags
            .map((tag) => `<span class = 'tag'>${tag}</span>`)
            .join("")}
                    </div>
                    <p class = 'title'><a href = "/blog.html?id=${blog.id}">${blog.title}</a></p>
                    <p><u>Date: ${blog.date}</u></p>
                    <p>"${blog.content}"</p>
                    <p class = 'like'>Likes : ${blog.likes}</p>
                </div>
            `);
    });
};
