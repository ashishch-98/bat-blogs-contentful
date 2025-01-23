import { createClient } from "contentful";
import {
  detachExperienceStyles,
  fetchBySlug,
} from "@contentful/experiences-sdk-react";
import Experience from "../../components/experience/experience";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || "",
  environment: "master",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
});

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ params, searchParams }: Props) {
  //experience
  const { slug } = await params;
  const locale = "en-US";
  const { expEditorMode } = await searchParams;
  const experienceTypeId = process.env.CONTENTFUL_EXPERIENCE_TYPE_ID || "";

  const experience = await fetchBySlug({
    client,
    slug,
    experienceTypeId,
    localeCode: locale,
    isEditorMode: expEditorMode === "true",
  });

  // extract the styles from the experience
  const stylesheet = experience ? detachExperienceStyles(experience) : null;

  // experience currently needs to be stringified manually to be passed to the component
  const experienceJSON = experience ? JSON.stringify(experience) : null;

  return (
    <>
      <div style={{ width: "100%" }}>
        {stylesheet && <style>{stylesheet}</style>}
        <Experience experienceJSON={experienceJSON} locale={locale} />
      </div>
    </>
  );
}
