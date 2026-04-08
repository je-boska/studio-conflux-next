import { client } from "./client";

export async function getProjects() {
  return client.fetch(
    `*[_type == "project"] | order(order asc) {
      _id,
      title,
      body,
      "slug": slug.current,
      "videoUrl": video.asset->url,
      "poster": poster.asset->url + "?w=800&q=75&auto=format",
    }`
  );
}

export async function getProjectSlugs(): Promise<string[]> {
  return client.fetch(
    `*[_type == "project"] | order(order asc).slug.current`
  );
}

export async function getProject(slug: string) {
  return client.fetch(
    `*[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      body,
      "slug": slug.current,
      "videoUrl": video.asset->url,
      "poster": poster.asset->url,
    }`,
    { slug }
  );
}

export async function getImprint() {
  return client.fetch(
    `*[_type == "page" && title == "Impressum"][0].body`
  );
}
