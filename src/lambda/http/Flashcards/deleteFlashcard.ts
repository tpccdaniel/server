import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { deleteFlashcard } from '../../../logicLayer/flashcard'
import { getUserId } from '../../utils'

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const flashcardId = event.pathParameters.flashcardId
  const userId = getUserId(event)

  await deleteFlashcard(userId, flashcardId)

  return {
    statusCode: 200,
    body: ''
  }
})

handler
  .use(httpErrorHandler())
  .use(cors({ credentials: true }))
