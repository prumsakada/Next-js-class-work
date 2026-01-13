import { PostType } from "../lib/post";

export default function PostCard({
    userId = 0,
    id = 0,
    title = "Default Title",
    body = "Default Description"
}: PostType) {
    return (
        <div >
            <div className="hover:bg-gray-900 hover:text-white transition duration-300 max-w-sm rounded overflow-hidden shadow-lg py-4 px-8">
                <h2 className="text-lg mb-3 font-semibold">
                    Title: {title}
                </h2>
                <p className="mb-2 text-sm text-gray-600">Description: {body}</p>
                <p>{userId} | {id}</p>
            </div>
        </div>
    )
}
