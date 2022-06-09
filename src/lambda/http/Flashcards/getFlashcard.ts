import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { getAllFlashcards } from '../../../logicLayer/flashcard'
import { getUserId } from '../../utils';

export const handler = middy(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        const userId = getUserId(event);
        const flashcards = await getAllFlashcards(userId);
        console.log(userId, flashcards);
        return {
            statusCode: 200,
            body: JSON.stringify({
                items: flashcards
            })
        }
    }
)

handler.use(
  cors({
    credentials: true
  })
)
