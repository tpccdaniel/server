/**
 * Fields in a request to update a single TODO item.
 */
export interface CreateFlashcardRequest {
  flashcardId: string
  userId: string
  activationDate: string
  question: string
  answer: boolean
}
