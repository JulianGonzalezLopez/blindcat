interface User{
    id?: number,
    username: string,
    password?: string,
    cantidad_posts?: number,
    karma?: number,
    creation_date: Date
}

interface Post{
    id?: number,
    title: string,
    content: string,
    nsfw?: boolean,
    creation_date: Date,
    opened?: number
}

interface Comment{
    id?: number,
    content: string,
    creator_id: number,
}

interface PostComment{
    comment_id: number,
    post_id: number
}

interface Posts_Tags{
    id?: number,
    post_id?: number,
    tag: string
}

interface UserPost{
    user_id: number,
    post_id: number
}

interface Opened_posts{
    post_id: number,
    user_id: number
}