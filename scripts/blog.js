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
let queryString = window.location.href;
const urlParams = new URLSearchParams(queryString);
let currentBlog = Number(urlParams.get("id"));
let blog = undefined;
// V1 means data is simply fetched over json server
function loadBlog() {
    return __awaiter(this, void 0, void 0, function* () {
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
}
// V2 means data is fetched through our way and this route is only taken when json server is not working
function loadBlogV2() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch("../data/db.json");
        let data = yield response.json();
        if (data) {
            blog = data.blogs.find((blog) => blog.id === currentBlog);
        }
    });
}
// V2 _____________________________________________________________________________________________________
const renderBlog = () => {
    console.log(blog);
    let header = document.getElementById("header");
    let content = document.getElementById("content");
    if (header) {
        header.innerHTML = `
    <h1>${blog === null || blog === void 0 ? void 0 : blog.title}</h1>
    <p><u>Date: ${blog === null || blog === void 0 ? void 0 : blog.date}</u></p>
    `;
    }
};
