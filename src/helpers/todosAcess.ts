// import 'source-map-support/register'
// import { createLogger } from '../utils/logger'
// import { HighlightItem } from '../models/HighlightItem'
// import { HighlightUpdate } from '../models/HighlightUpdate';
//
// import * as AWS from 'aws-sdk';
// // import {Todo} from "../../../client/src/types/Todo";
// import * as AWSXRay from 'aws-xray-sdk'
//
// let XAWS = AWS;
// if (!process.env.LOCAL) {
//     XAWS = AWSXRay.captureAWS(AWS)
// }
//
// const docClient = new XAWS.DynamoDB.DocumentClient()
//
// const logger = createLogger('HighlightsAccess')
//
// // DONE: Implement the dataLayer logic
// export class HighlightsAccess {
//
//     constructor(
//         private readonly highlightsTable = process.env.TODOS_TABLE,
//         // private readonly bucketName = process.env.ATTACHMENT_S3_BUCKET,
//     ) {
//     }
//
//     async getHighlight(highlightId: string, userId: string): Promise<HighlightItem> {
//         logger.info('Getting highlight', { highlightId, userId })
//
//         const result = await docClient.query({
//             TableName: this.highlightsTable,
//             IndexName: 'CreatedAtIndex',
//             KeyConditionExpression: 'userId = :userId and createdAt = :highlightId',
//             ExpressionAttributeValues: {
//                 ':userId': userId,
//                 ':highlightId': highlightId
//             }
//         }).promise()
//
//         const item = result.Items[0]
//         if (!item) {
//             logger.error('Highlight not found', { highlightId, userId })
//             throw new Error('Highlight not found')
//         }
//
//         return item as HighlightItem
//     }
//
//     // async getTodos(userId: string, limit: number, nextKey: string): Promise<TodoItem[]> {
//     //     const result = await docClient.query({
//     //         TableName: this.todosTable,
//     //         IndexName: 'CreatedAtIndex',
//     //         KeyConditionExpression: 'userId = :userId',
//     //         ExpressionAttributeValues: {
//     //             ':userId': userId
//     //         },
//     //         Limit: limit,
//     //         ExclusiveStartKey: nextKey
//     //     }).promise()
//     //
//     //     return result.Items as TodoItem[]
//     // }
//
//     async getHighlights(userId: string): Promise<HighlightItem[]> {
//
//         const params = {
//             TableName: this.highlightsTable,
//             KeyConditionExpression: 'userId = :userId',
//             ExpressionAttributeValues: {
//                 ':userId': userId
//             }
//         }
//
//         const result = await docClient.query(params).promise()
//
//         const items = result.Items
//         return items as HighlightItem[]
//     }
//
//
//
//     async createHighlight(highlight: HighlightItem): Promise<HighlightItem> {
//
//         console.log('Creating');
//
//         const params = {
//             TableName: this.highlightsTable,
//             Item: highlight
//         }
//
//         await docClient.put(params).promise()
//
//         console.log('Done');
//
//         return highlight as HighlightItem
//     }
//
//     async updateHighlight(updatedHighlight: HighlightUpdate, highlightId: string, userId: string): Promise<String> {
//
//         logger.info(`Updating highlight /highlightAccess/updateHighlight ${highlightId}`)
//
//         const params = {
//             TableName: this.highlightsTable,
//             Key: {
//                 userId: userId,
//                 highlightId: highlightId
//             },
//             UpdateExpression: "set #name = :n, dueDate = :due, done = :d",
//             ExpressionAttributeValues: {
//                 ":n": updatedHighlight.name,
//                 ":due": updatedHighlight.dueDate,
//                 ":d": updatedHighlight.done
//             },
//             ExpressionAttributeNames: {
//                 "#name": "name"
//             },
//             ReturnValues: "UPDATED_NEW"
//         }
//
//         await docClient.update(params).promise()
//
//         logger.info(`Highlight updated ${highlightId} by user ${userId}`)
//
//         return
//     }
//
//     async deleteHighlight(highlightId: string, userId: string) {
//
//         logger.info(`Updating highlight /highlightAccess/deleteHighlight ${highlightId}`)
//
//         const params = {
//             TableName: this.highlightsTable,
//             Key: {
//                 userId: userId,
//                 highlightId: highlightId
//             }
//         }
//
//         await docClient.delete(params).promise()
//
//         logger.info(`Highlight deleted ${highlightId} by user ${userId}`)
//
//         return
//     }
// }
//
