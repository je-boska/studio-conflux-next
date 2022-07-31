import sanityClient from '@sanity/client';

const _projectId = process.env.SANITY_PROJECT_ID;
const _dataset = process.env.SANITY_DATASET;

export default sanityClient({
  projectId: _projectId,
  dataset: _dataset,
  apiVersion: '2021-08-31',
  useCdn: false,
});
