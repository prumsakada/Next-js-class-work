import { PostType } from "../post";

const BASE_API = process.env.NEXT_PUBLIC_API_URL

export async function loadPost() {
        const data = await fetch(`${BASE_API}posts`)
        const posts:PostType[] = await data.json()
        return posts;
}

export async function fetchPost(id: string) {
    const data = await fetch(`${BASE_API}posts/${id}`)
    const post = await data.json()
    return post;

}