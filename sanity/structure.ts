import type { StructureResolver } from 'sanity/structure'

// Desk structure configuration for Smile Care Medical Center Sanity Studio
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Smile Care Content')
    .items([
      S.documentTypeListItem('doctor')
        .title('Doctors & Medical Team')
        .child(
          S.documentList()
            .title('Doctors')
            .filter('_type == "doctor"')
            .defaultOrdering([{ field: 'displayOrder', direction: 'asc' }])
        ),
      S.documentTypeListItem('post')
        .title('Blog Posts & Articles')
        .child(
          S.documentList()
            .title('Articles')
            .filter('_type == "post"')
            .defaultOrdering([{ field: 'date', direction: 'desc' }])
        ),
      S.documentTypeListItem('service')
        .title('Clinical Services')
        .child(
          S.documentList()
            .title('Services')
            .filter('_type == "service"')
            .defaultOrdering([{ field: 'displayOrder', direction: 'asc' }])
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !['doctor', 'post', 'service'].includes(listItem.getId() || '')
      ),
    ])
