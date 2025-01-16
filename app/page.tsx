import { draftMode } from "next/headers";

import MoreStories from "./components/blog/more-stories";

import { getAllPosts } from "@/lib/api";
import HeroBanner from "./components/blog/heroBanner";
import HeroPost from "./components/blog/heroPost";

export default async function Page() {
  const { isEnabled } = draftMode();
  const allPosts = await getAllPosts(isEnabled);
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <>
      <HeroBanner />
      <div className="container mx-auto px-5">
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
        <h2 className="mb-8 text-4xl md:text-4xl font-bold tracking-tighter leading-tight">
          More Stories
        </h2>
        <MoreStories morePosts={morePosts} />
      </div>
    </>
  );
}
