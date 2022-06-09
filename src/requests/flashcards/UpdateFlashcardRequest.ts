/**
 * Fields in a request to update a single TODO item.
 */
export interface UpdateFlashcardRequest {
  activationDate: string
  question: string
  answer: boolean
}
