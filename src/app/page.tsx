import CardClientsList from "@/components/Cards/CardClientsList";
import Cards from "@/components/Cards/Cards";
import LaodingCard from "@/components/LoadingCard";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { loadPost } from "@/lib/data/fetchPost";
import { ArrowUpIcon } from "lucide-react";



export default function Home() {
  return (
    <div>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Desctructive</Button>
      <Button variant="outline" size="icon" aria-label="Submit">
        <ArrowUpIcon />
      </Button>
      {/* <LaodingCard/> */}
      {/* <CardClientsList loadPost={loadPost()} /> */}
    </div>

  );
}
