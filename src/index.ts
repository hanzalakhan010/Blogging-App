// V1 means data is simply fetched over json server
let blogs: Blog[] = [];
var host: string = "https://studious-carnival-644w6rgwr9p2rq9q-5555.app.github.dev";
let totalBlogs = 40

let queryString = window.location.href.split("?")[1];
const urlParams = new URLSearchParams(queryString);

const othertypeOfSearches = urlParams.get('type')

async function loadBlogsV1() {
  try {
    let response = await fetch(`${host}/blogs`);
    let data = await response.json();
    if (data) {
      blogs = data;
    }
  } catch (err) {
    await loadBlogsV2();
    console.log('from v2')
  } finally {
    renderBlogs();
  }
}
// _____________________________________________________________________________________________________
// V2 means data is fetched through our way and this route is only taken when json server is not working
async function loadBlogsV2() {
  let response = await fetch("../data/db.json");
  let data = await response.json();
  if (data) {
    blogs = data.blogs;
  }
}

// _____________________________________________________________________________________________________



const renderBlogs = () => {
  console.log(blogs.length);
  blogs.forEach((blog: Blog) => {
    let blogsDiv = document.getElementById("blogs");
    blogsDiv?.insertAdjacentHTML(
      "beforeend",
      `
                <div class = 'blog'>
                    <div class = 'tagsDiv'>
                      ${blog.tags
        .map((tag) => `<span class = 'tag'>${tag}</span>`)
        .join("")}
                    </div>
                    <p class = 'title'><a href = "/blog.html?id=${blog.id}">${blog.title
      }</a></p>
                    <p><u>Date: ${blog.date}</u></p>
                    <p>"${blog.content}"</p>
                    <p class = 'like'>Likes : ${blog.likes}</p>
                </div>
            `
    );
  });
};

const loadOthers = async () => {
  let randomList: Array<number> = []
  for (let i = 0; i < 10; i++) {
    let random = Math.floor(Math.random() * totalBlogs)
    if (!randomList.includes(random)) {
      try {
        let response = await fetch(`${host}/blogs/${random}`)
        let data = await response.json()
        if (data) {
          blogs.push(data)
        }
      }
      catch {
        loadBlogsV1()
      }
    }
    else {
      i--
    }
  }

  renderBlogs()

}

document.body.onload = () => {

  if (!othertypeOfSearches) {
    loadBlogsV1()
  } else {
    loadOthers()

  }

}