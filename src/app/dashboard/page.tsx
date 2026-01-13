import PostCard from "@/components/PostCard"
import { loadPost } from "@/lib/data/fetchPost"
import Link from "next/link"

export default async function Dashboard() {
    const posts = await loadPost()
    return (

        <div className="grid grid-cols-6 gap-4">
            {
                posts.map((post) => (
                    <div key={post.id}>
                        <Link href={`dashboard/blog/${post.id}`}>
                            <PostCard
                                key={post.id}
                                userId={post.id}
                                id={post.id}
                                title={post.title}
                                body={post.body}
                            />
                        </Link>
                    </div>
                )
                )
            }
        </div>
    )
}