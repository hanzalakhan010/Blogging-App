type blogComment = {
    id: Number
    userId: Number,
    text: String,
    date: String,
}
type Blog = {
    id: Number,
    title: String,
    content: String,
    authorId: Number,
    date: String,
    tags: string[],
    categories: string[],
    likes: Number,
    dislikes: Number,
    shares: Number,
    bookmarks: Number[],
    comments: blogComment[],
}
type User = {
    id: Number,
    name: String,
    username: String,
    email: String,
    password: String,
    bio: String,
    avatar: String,
    followers: Number[]
}