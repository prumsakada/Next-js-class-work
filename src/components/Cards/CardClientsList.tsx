"use client"

import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { use } from "react"
import { PostType } from "@/lib/post"
import Cards from "./Cards"
import Link from "next/link"

export default function CardClientsList({ loadPost }:{loadPost:Promise<PostType[]>}) {
    const posts: PostType[] = use(loadPost)
    return (
        <div className="grid grid-cols-6 gap-4">
            {
                posts.map((post) => (
                    <div key={post.id}>
                        <Link href={`dashboard/blog/${post.id}`}>
                            <Cards
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