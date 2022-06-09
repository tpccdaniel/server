import 'source-map-support/register'
import {FlashcardItem} from '../models/FlashcardItem'
import * as AWS from 'aws-sdk';
import * as AWSXRay from 'aws-xray-sdk'

let XAWS = AWS;
if (!process.env.LOCAL) {
    XAWS = AWSXRay.captureAWS(AWS)
}

export class FlashcardsAccess {

    constructor(
        private readonly docClient: AWS.DynamoDB.DocumentClient = new XAWS.DynamoDB.DocumentClient(),
        private readonly tableName = process.env.DB_TABLE,
        private readonly userIdIndex = process.env.DB_CREATED_AT_INDEX,
        // private readonly logger = createLogger('TodosAccess')
    ) {
    }

    async getFlashcard(userId: string, flashcardId: string): Promise<FlashcardItem> {
        const result = await this.docClient.query({
            TableName: this.tableName,
            IndexName: this.userIdIndex,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            }
        }).promise()

        const items = result.Items
        if (items) {
            return items.find((item) => item.flashcardId === flashcardId) as FlashcardItem
        }
        return undefined
    }

    async getAllFlashcards(userId: string): Promise<FlashcardItem[]> {
        const result = await this.docClient.query({
            TableName: this.tableName,
            IndexName: this.userIdIndex,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            }
        }).promise()

        return result.Items as FlashcardItem[]
    }


    async getFlashcards(userId: string): Promise<FlashcardItem[]> {
        const result = await this.docClient.query({
            TableName: this.tableName,
            IndexName: this.userIdIndex,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            }
        }).promise()

        const items = result.Items
        return items as FlashcardItem[]
    }

    async updateFlashcard(userId: string, flashcardId: string, newFlashcard): Promise<void> {

        await this.docClient.update({
            TableName: this.tableName,
            Key: {
                userId,
                flashcardId
            },
            UpdateExpression: 'set #question = :question, #answer = :answer, #activationDate = :activationDate',
            ExpressionAttributeValues: {
                ':question': newFlashcard.question,
                ':answer': newFlashcard.answer,
                ':activationDate': newFlashcard.activationDate
            },
            ExpressionAttributeNames: {
                '#question': 'question',
                '#answer': 'answer',
                '#activationDate': 'activationDate'
            }
        }).promise()

        return
    }

    async updateActivationDate(userId: string, flashcardId: string, activationDate: string): Promise<void> {
        await this.docClient.update({
            TableName: this.tableName,
            Key: {
                userId,
                flashcardId
            },
            UpdateExpression: 'set activationDate = :activationDate',
            ExpressionAttributeValues: {
                ':activationDate': activationDate
            }
        }).promise()
    }

    async createFlashcard(flashcard: FlashcardItem): Promise<FlashcardItem> {
        await this.docClient.put({
            TableName: this.tableName,
            Item: flashcard
        }).promise()

        return flashcard as FlashcardItem
    }

    async deleteFlashcard(userId: string, flashcardId: string): Promise<string> {
        await this.docClient.delete({
            TableName: this.tableName,
            Key: {
                userId,
                flashcardId
            }
        }).promise()

        return
    }

}
