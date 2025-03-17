"use strict";
// V1 means data is simply fetched over json server 
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let blogs = [];
let host = 'http://localhost:5555';
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
            loadBlogsV2();
        }
        finally {
            renderBlogs();
        }
    });
}
// _____________________________________________________________________________________________________
// V2 means data is fetched through our way and this route is only taken when json server is not working
function loadBlogsV2() {
    return __awaiter(this, void 0, void 0, function* () { });
}
// _____________________________________________________________________________________________________
const renderBlogs = () => {
    console.log(blogs.length);
    blogs.forEach((blog) => {
        console.log(blog);
        let blogsDiv = document.getElementById('blogs');
        blogsDiv === null || blogsDiv === void 0 ? void 0 : blogsDiv.insertAdjacentHTML('beforeend', `
                <div class = 'blog'>
                    <p class = 'title'>${blog.title}</p>
                    <p>Date: ${blog.date}</p>
                    <p>"${blog.content}"</p>
                </div>
            `);
    });
};
