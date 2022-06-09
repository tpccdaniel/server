// import { TodosAccess } from './todosAcess'
// import { createLogger } from '../utils/logger'
// import { Readwise } from '../utils/readwise'
// // import { Highlight } from '../models/Highlight'
// import { HighlightAccess } from '../dataLayer/highlightAccess'
// import { createHighlight } from '../businessLogic/highlights'
//
// const logger = createLogger('Readwise Sync')
//
// export async function syncHighlightsToReadwise() {
//     logger.info('Syncing highlights to Readwise')
//
//     // get all users with videos and highlights where the video has highlights and where the highlight was created between now and one hour ago and where the users readwise_key is not null
//
//     const highlights = await highlightAccess.getHighlightsForReadwiseSync()
//     logger.info(`Found ${highlights.length} highlights to sync`)
//     for (const highlight of highlights) {
//         const readwise = new Readwise(highlight.userId)
//         const readwiseHighlight = await readwise.createHighlight(highlight)
//         if (readwiseHighlight) {
//             await highlightAccess.updateHighlight(highlight.highlightId, {
//                 readwise_highlight_id: readwiseHighlight.id,
//                 readwise_highlight_url: readwiseHighlight.url,
//             })
//         }
//     }
// }
//
// }
//
//
// export {
//     syncHighlightsToReadwise,
// }
