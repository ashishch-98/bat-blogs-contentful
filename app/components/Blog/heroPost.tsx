import Link from "next/link";
import CoverImage from "./cover-image";
import Avatar from "./avatar";
import Date from "./date";

export default function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: {
  title: string;
  coverImage: any;
  date: string;
  excerpt: string;
  author: any;
  slug: string;
}) {
  return (
    <section className="hero-post">
      <div className="md:grid md:grid-cols-2 md:gap-5">
        <div className="mb-8 md:mb-16">
          <CoverImage title={title} slug={slug} url={coverImage.url} />
        </div>
        <div className="md:grid md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
          <div>
            <h3 className="mb-4 text-2xl lg:text-3xl leading-tight">
              <Link href={`/posts/${slug}`} className="hover:underline">
                {title}
              </Link>
            </h3>
            <div className="mb-4 md:mb-0 text-lg">
              <Date dateString={date} />
            </div>
          </div>
          <div>
            <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
            {author && <Avatar name={author.name} picture={author.picture} />}
          </div>
        </div>
      </div>
    </section>
  );
}
