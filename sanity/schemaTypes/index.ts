import { type SchemaTypeDefinition } from 'sanity'
import { blockContentType } from './blockContentType'
import { doctorType } from './doctorType'
import { postType } from './postType'
import { serviceType } from './serviceType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    doctorType,
    postType,
    serviceType,
  ],
}
