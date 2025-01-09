import ContentfulImage from "../lib/contentful-image";
import Link from "next/link";

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function CoverImage({
  title,
  url,
  slug,
}: {
  title: string;
  url: string;
  slug?: string;
}) {
  const image = (
    <ContentfulImage
      alt={`Cover Image for ${title}`}
      priority
      className={cn("object-cover", "rounded-lg", "shadow-small", {
        "hover:shadow-medium transition-shadow duration-200": slug,
      })}
      src={url}
      layout="fill"
    />
  );

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {/* Container with consistent size for all images */}
          <div className="relative w-[550px] h-[350px] overflow-hidden rounded-lg">
            {image}
          </div>
        </Link>
      ) : (
        <div className="relative w-[550px] h-[350px] overflow-hidden rounded-lg">
          {image}
        </div>
      )}
    </div>
  );
}
