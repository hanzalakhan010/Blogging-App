// V1 means data is simply fetched over json server 

let blogs: Blog[] = []
let host: string = 'http://localhost:5555'
async function loadBlogsV1() {
    try {
        let response = await fetch(`${host}/blogs`)
        let data = await response.json()
        if (data) {
            blogs = data
        }
    }
    catch (err) {
        loadBlogsV2()
    }
    finally {
        renderBlogs()
    }
}
// _____________________________________________________________________________________________________
// V2 means data is fetched through our way and this route is only taken when json server is not working
async function loadBlogsV2() { }

// _____________________________________________________________________________________________________

const renderBlogs = () => {
    console.log(blogs.length)
    blogs.forEach((blog: Blog) => {
        console.log(blog)
        let blogsDiv = document.getElementById('blogs')
        blogsDiv?.insertAdjacentHTML('beforeend', `
                <div class = 'blog'>
                    <p class = 'title'>${blog.title}</p>
                    <p>Date: ${blog.date}</p>
                    <p>"${blog.content}"</p>
                </div>
            `)
    })
}