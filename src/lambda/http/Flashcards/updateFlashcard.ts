import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { UpdateFlashcardRequest } from "../../../requests/flashcards/UpdateFlashcardRequest";
import { getUserId } from '../../utils'

import { createLogger } from '../../../utils/logger'
import {updateFlashcard} from "../../../logicLayer/flashcard";
const logger = createLogger('update flashcard')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const request: UpdateFlashcardRequest = JSON.parse(event.body)

    logger.info(`Updating flashcard /lambda/http/updateFlashcard`, event)

    const userId = getUserId(event)
    const flashcardId = event.pathParameters.flashcardId
    const response = await updateFlashcard(flashcardId, userId, request)

    return {
        statusCode: 200,
        body: JSON.stringify({
            item: response
        })
    }
  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
