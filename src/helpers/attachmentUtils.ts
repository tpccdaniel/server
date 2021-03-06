import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

let XAWS = AWS;
if (!process.env.LOCAL) {
    XAWS = AWSXRay.captureAWS(AWS)
}

// DONE: Implement the fileStore logic

export default class FileStore {
    constructor(
        private readonly s3: AWS.S3 = new XAWS.S3({signatureVersion: 'v4'}),
        private readonly bucketName = process.env.ATTACHMENT_S3_BUCKET,
        private readonly urlExpiration = process.env.SIGNED_URL_EXPIRATION
    ) {}

    getBucketName() {
        return this.bucketName
    }

    getPresignedUrl(flashcardId: string): string {
        return this.s3.getSignedUrl('putObject', {
            Bucket: this.bucketName,
            Key: flashcardId,
            Expires: parseInt(this.urlExpiration)
        })
    }

    async storeFile(flashcardId: string, file: Buffer): Promise<void> {
        await this.s3.upload({
            Bucket: this.bucketName,
            Key: flashcardId,
            Body: file,
            ContentType: 'image/png'
        }).promise()
    }
}
