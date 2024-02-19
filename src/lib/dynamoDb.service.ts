import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class DynamoDBService {
  private readonly documentClient: AWS.DynamoDB.DocumentClient;
  private readonly tableName: string = 'Todos';

  constructor() {
    this.documentClient = new AWS.DynamoDB.DocumentClient({
      region: 'us-east-2',
      endpoint: 'http://localhost:8000',
      accessKeyId: 'fakeAccessKey',
      secretAccessKey: 'fakeSecretAccessKey',
    });
  }

  async createTodoTable(): Promise<void> {
    const params: AWS.DynamoDB.CreateTableInput = {
      TableName: this.tableName,
      KeySchema: [
        { AttributeName: 'id', KeyType: 'HASH' }, // Partition key
      ],
      AttributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'S' }, // S for string
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
    };

    try {
      await this.documentClient.createTable(params).promise();
      console.log('Table created successfully');
    } catch (error) {
      console.error('Error creating table:', error);
      throw error;
    }
  }

  async get(
    params: AWS.DynamoDB.DocumentClient.GetItemInput,
  ): Promise<AWS.DynamoDB.DocumentClient.GetItemOutput> {
    try {
      return await this.documentClient.get(params).promise();
    } catch (error) {
      console.error('Error getting item from DynamoDB:', error);
      throw error;
    }
  }

  async put(
    params: AWS.DynamoDB.DocumentClient.PutItemInput,
  ): Promise<AWS.DynamoDB.DocumentClient.PutItemOutput> {
    try {
      return await this.documentClient.put(params).promise();
    } catch (error) {
      console.error('Error putting item into DynamoDB:', error);
      throw error;
    }
  }

  async delete(
    params: AWS.DynamoDB.DocumentClient.DeleteItemInput,
  ): Promise<AWS.DynamoDB.DocumentClient.DeleteItemOutput> {
    try {
      return await this.documentClient.delete(params).promise();
    } catch (error) {
      console.error('Error deleting item from DynamoDB:', error);
      throw error;
    }
  }

  async scan(
    params: AWS.DynamoDB.DocumentClient.ScanInput,
  ): Promise<AWS.DynamoDB.DocumentClient.ScanOutput> {
    try {
      return await this.documentClient.scan(params).promise();
    } catch (error) {
      console.error('Error scanning DynamoDB table:', error);
      throw error;
    }
  }
}
