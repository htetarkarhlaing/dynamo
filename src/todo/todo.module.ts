import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { DynamoDBService } from 'src/lib/dynamodb.service';

@Module({
  controllers: [TodoController],
  providers: [TodoService, DynamoDBService],
})
export class TodoModule {}
