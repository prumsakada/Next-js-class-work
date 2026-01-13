import { PostType } from "@/lib/post";
import { Button } from "../ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

export default function Cards({
    userId,
    id,
    title,
    body
}: PostType) {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    {body}
                </CardDescription>
                <CardAction>
                    <Button variant="link"> {userId} | {id}</Button>
                </CardAction>
            </CardHeader>
        </Card>
    )
}