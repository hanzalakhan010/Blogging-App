import getUserName from "./users.js";
let queryString = window.location.href.split("?")[1];
const urlParams = new URLSearchParams(queryString);
const apiKey: string = "lZE8TZ/P5vjFf8ruEpBU+w==PMRnYSk8dj5A2t5f";
let currentBlog = Number(urlParams.get("id"));
let blog: Blog | undefined = undefined;
var host: string = "http://localhost:5555";

// V1 means data is simply fetched over json server

const loadBlog = async () => {
  try {
    let response = await fetch(`${host}/blogs/${currentBlog}`);
    let data = await response.json();
    if (data) {
      blog = data;
    }
  } catch (err) {
    await loadBlogV2();
  } finally {
    renderBlog();
  }
};
// V2 means data is fetched through our way and this route is only taken when json server is not working

const loadBlogV2 = async () => {
  let response = await fetch("../data/db.json");
  let data = await response.json();
  if (data) {
    blog = data.blogs.find((blog: Blog) => blog.id === currentBlog);
  }
};
// V2 _____________________________________________________________________________________________________
const loremText = async (para: number) => {
  let response = await fetch(
    `https://api.api-ninjas.com/v1/loremipsum?paragraphs=${para}`,
    {
      headers: {
        "X-Api-Key": apiKey,
      },
    }
  );
  let data = await response.json();
  if (data && blog) {
    blog.content += data.text.split(".").join("<br>");
  }
};

const renderBlog = async () => {
  // await loremText(10)
  let header = document.getElementById("header");
  let content = document.getElementById("content");
  let comments = document.getElementById("comments");
  if (header && blog) {
    header.innerHTML = `
    <h1>${blog?.title}</h1>
    <p><u>Date: ${blog?.date}</u></p>
    <span>likes : ${blog.likes}</span>
    <span>Shares : ${blog.shares}</span>
    `;
  }
  if (content && blog) {
    content.innerHTML = `
    <p>${blog?.content}</p>
    <div class = 'comments'>
    `;
  }
  if (blog && comments) {
    blog.comments.forEach(async (comment) => {
      comments.insertAdjacentHTML(
        "beforeend",
        `
          <div class='comment'>
            <p>${comment.date}</p>
            <p>${comment.text}</p>
            <p>${await getUserName(comment.userId)}</p>
            </div>
            `
      );
    });
  }
};
async function addComment() {
  let comment = document.getElementById("commentText") as HTMLInputElement;
  let commentText = comment.value;
  let __blog = blog;
  let loginUserID = parseInt(localStorage.getItem("loginUser") || "0");
  let date = new Date().toDateString()
  __blog?.comments.push({
    id: blog?.comments?.length ? blog.comments.length + 1 : 1,
    userId: loginUserID,
    text: commentText,
    date,
  });
  if (commentText) {
    comment.value = ''
    let response = await fetch(`${host}/blogs/${currentBlog}`, {
      method: "PATCH",
      body: JSON.stringify({ comments: blog?.comments }),
    });
    // let data = await response.json();
    if (response.ok){
      let commentsDiv = document.getElementById("comments");
      commentsDiv?.insertAdjacentHTML('beforeend',`
        <div class='comment'>
            <p>${date}</p>
            <p>${commentText}</p>
            <p>${await getUserName(loginUserID)}</p>
            </div>
        `)
    }
  }
}
declare global {
  interface Window {
    addComment: () => void;
    loadBlog: () => void;
  }
}

window.loadBlog = loadBlog;
window.addComment = addComment;
