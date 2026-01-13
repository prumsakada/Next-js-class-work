import { div } from "motion/react-client";
import { Skeleton } from "./ui/skeleton";

export default function LaodingCard() {
    return (
        <div className="grid grid-cols-6 min-h-screen items-center justify-center gap-6">
            {
                [...Array(18)].map((_,index) => (
                    <div key={index} className="flex flex-col space-y-3">
                        <Skeleton className="w-full aspect-5/2 rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    </div>
                ))
            }
        </div>
    )
}