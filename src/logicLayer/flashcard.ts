import { FlashcardsAccess } from '../dataLayer/flashcardAccess'
// import FileStore from '../helpers/attachmentUtils';

import { FlashcardItem } from '../models/FlashcardItem'
// import * as createError from 'http-errors'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'

const logger = createLogger('Flashcard Logic Layer')

const flashcardsAccess = new FlashcardsAccess()

export async function getAllFlashcards(userId: string): Promise<FlashcardItem[]> {
  logger.info('getAllFlashcards')
  return await flashcardsAccess.getAllFlashcards(userId)
}

export async function createFlashcard(userId: string, flashcard): Promise<FlashcardItem> {
  logger.info('createFlashcard')
  const flashcardId = uuid.v4()
  return await flashcardsAccess.createFlashcard({
    userId,
    flashcardId,
    createdAt: new Date().toISOString(),
    ...flashcard
  })
}

export async function updateFlashcard(flashcardId: string, userId: string, flashcard): Promise<string> {
  logger.info('updateFlashcard')
  await flashcardsAccess.updateFlashcard(userId, flashcardId, flashcard)

  return ''
}

export async function deleteFlashcard(userId: string, flashcardId: string): Promise<string> {
  logger.info('deleteFlashcard')
  await flashcardsAccess.deleteFlashcard(userId, flashcardId)

  return ''
}


