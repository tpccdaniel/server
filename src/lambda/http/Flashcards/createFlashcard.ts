import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getUserId } from '../../utils';
import { createFlashcard } from '../../../logicLayer/flashcard'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
      const newFlashcard = JSON.parse(event.body)
      const userId = getUserId(event)

      const newItem = await createFlashcard(userId, newFlashcard)
      return {
          statusCode: 201,
          body: JSON.stringify({
              item: newItem
          })
      }
  })

handler.use(
  cors({
    credentials: true
  })
)
