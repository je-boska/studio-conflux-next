import sanityClient from '../utils/client';
import groq from 'groq';

export async function getProjects() {
  const projects = await sanityClient.fetch(
    groq`*[_type == "project"] | order(order asc) {
      _id,
      title,
      body,
      "slug": slug.current,
      "videoUrl": video.asset->url,
      "poster": poster.asset->url,
    }
    `
  );

  return projects;
}

export async function getProjectPaths() {
  const projectSlugs = await sanityClient.fetch(
    groq`*[_type == "project"] | order(order asc) {
      "slug": slug.current,
    }
    `
  );

  const paths = projectSlugs.map((el: any) => ({
    params: { slug: el.slug },
  }));

  return paths;
}

export async function getSingleProject(slug: string) {
  const project = await sanityClient.fetch(
    groq`*[_type == "project" && slug.current == "${slug}" ] | order(order asc) {
      _id,
      title,
      body,
      "slug": slug.current,
      "videoUrl": video.asset->url,
      "poster": poster.asset->url,
    }
    `
  );

  return project[0];
}
