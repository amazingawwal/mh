import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

// export const client = createClient({
//   projectId:'2765byju',
//   dataset:'production',
//   apiVersion:'v2025-03-09',
//   useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
// })
