import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2026-11-22' })
const projectId = client.config().projectId

async function setupCors() {
  console.log(`Setting up CORS origins for project ${projectId}...`)

  const originsToAdd = [
    'https://smilecare.ae',
    'https://www.smilecare.ae',
  ]

  // 1. Fetch existing CORS origins
  const existingCors: any = await client.request({
    uri: `/projects/${projectId}/cors`,
    method: 'GET',
  })
  console.log('Current CORS origins:', existingCors)

  for (const origin of originsToAdd) {
    const found = Array.isArray(existingCors) && existingCors.find((item: any) => item.origin === origin)
    if (found) {
      console.log(`✓ Origin already present: ${origin} (credentials: ${found.allowCredentials})`)
    } else {
      console.log(`Adding CORS origin: ${origin} (with credentials: true)...`)
      const res = await client.request({
        uri: `/projects/${projectId}/cors`,
        method: 'POST',
        body: {
          origin,
          allowCredentials: true,
        },
      })
      console.log(`✓ Successfully added:`, res)
    }
  }

  // 2. Fetch updated list to confirm
  const updatedCors: any = await client.request({
    uri: `/projects/${projectId}/cors`,
    method: 'GET',
  })
  console.log('\nUpdated Sanity CORS origins list:')
  console.table(updatedCors)
}

setupCors().catch(console.error)
