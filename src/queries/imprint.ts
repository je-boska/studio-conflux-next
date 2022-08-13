import sanityClient from '../utils/client';
import groq from 'groq';

export const getImprint = async () => {
  const imprint = await sanityClient.fetch(
    groq`*[_type == "page" && title == "Impressum"] {
      _id,
      title,
      body,
    }
    `
  );

  return imprint[0].body;
};
