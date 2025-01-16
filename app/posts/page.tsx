import { getAllPosts } from "@/lib/api";
import { draftMode } from "next/headers";
import MoreStories from "../components/blog/more-stories";

export default async function AllPosts() {
  const { isEnabled } = draftMode();
  const allPosts = await getAllPosts(isEnabled);
  return (
    <div className="container mx-auto px-5 mt-16">
      <MoreStories morePosts={allPosts} />
    </div>
  );
}
