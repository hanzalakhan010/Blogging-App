let queryString = window.location.href.split('?')[1];
const urlParams = new URLSearchParams(queryString);

let currentBlog = Number(urlParams.get("id"))
let blog: Blog | undefined = undefined;

// V1 means data is simply fetched over json server
async function loadBlog() {
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
}

// V2 means data is fetched through our way and this route is only taken when json server is not working

async function loadBlogV2() {
  let response = await fetch("../data/db.json");
  let data = await response.json();
  if (data) {
    blog = data.blogs.find((blog: Blog) => blog.id === currentBlog);
  }
}
// V2 _____________________________________________________________________________________________________

const renderBlog = () => {
  console.log(blog);
  let header = document.getElementById("header");
  let content = document.getElementById("content");
  if (header) {
    header.innerHTML = `
    <h1>${blog?.title}</h1>
    <p><u>Date: ${blog?.date}</u></p>
    <p>${blog?.content}</p>
    `;
  }
};
