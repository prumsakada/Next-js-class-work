import PostCard from "@/components/PostCard";
import { fetchPost } from "@/lib/data/fetchPost";

export default async function Blog(
    {
        params

    }:
        {
            param: Promise<{ slug: string }>
        }
) {
    const { slug } = await params
    const post = await fetchPost(slug)
    return (
        <>
            {
                <PostCard
                    key={post.id}
                    userId={post.id}
                    id={post.id}
                    title={post.title}
                    body={post.body}
                />
            }
        </>
    )
}
