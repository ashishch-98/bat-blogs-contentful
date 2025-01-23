import Link from "next/link";
import { draftMode } from "next/headers";

import MoreStories from "@/app/components/blog/more-stories";
import ContentfulImage from "@/lib/contentful-image";
import Avatar from "@/app/components/blog/avatar";
import Date from "@/app/components/blog/date";
import { Markdown } from "@/lib/markdown";
import { getAllPosts, getPostAndMorePosts } from "@/lib/api";

export async function generateStaticParams() {
  const allPosts = await getAllPosts(false);

  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const { post, morePosts } = await getPostAndMorePosts(slug, isEnabled);

  return (
    <div className="container mx-auto px-5">
      <article>
        <h1 className="mb-12 mt-8 text-center text-4xl font-bold leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl">
          {post.title}
        </h1>
        <div className="hidden md:mb-12 md:block">
          {post.author && (
            <Avatar name={post.author.name} picture={post.author.picture} />
          )}
        </div>
        <div className="mb-8 sm:mx-0 md:mb-16">
          <div className="sm:mx-0">
            <div className="relative w-[1200px] h-[600px] overflow-hidden rounded-lg">
              <ContentfulImage
                alt={`Cover Image for ${post.title}`}
                priority
                className="object-cover rounded-lg shadow-small hover:shadow-medium transition-shadow duration-200"
                src={post.coverImage.url}
                layout="fill"
              />
            </div>
          </div>
          {/*  */}
          {/* <CoverImage title={post.title} url={post.coverImage.url} /> */}
        </div>
        <div className="mx-auto">
          <div className="mb-6 block md:hidden">
            {post.author && (
              <Avatar name={post.author.name} picture={post.author.picture} />
            )}
          </div>
          <div className="mb-6 text-lg">
            {post?.postTags?.tags?.map((tag: string, index: number) => (
              <p
                key={index}
                style={{ marginRight: "12px" }}
                className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset"
              >
                {tag}
              </p>
            ))}
          </div>

          <div className="mb-6 text-lg">
            <Date dateString={post.date} />
          </div>
        </div>

        <div className="mx-auto">
          <div className="prose max-w-[1200px]">
            <Markdown content={post.content} />
          </div>
        </div>
      </article>
      <hr className="border-accent-2 mt-28 mb-24" />
      <MoreStories morePosts={morePosts} />
    </div>
  );
}
