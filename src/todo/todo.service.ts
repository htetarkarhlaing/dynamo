import { Injectable } from '@nestjs/common';
import { DynamoDBService } from '../lib/dynamodb.service';
import { Todo } from './todo.model';

@Injectable()
export class TodoService {
  private readonly tableName: string = 'Todos';

  constructor(private readonly dbService: DynamoDBService) {}

  async getAllTodos(): Promise<Todo[]> {
    const params = {
      TableName: this.tableName,
    };
    const data = await this.dbService.scan(params);
    return data.Items as Todo[];
  }

  async getTodoById(id: string): Promise<Todo | null> {
    const params = {
      TableName: this.tableName,
      Key: {
        id: id,
      },
    };
    const data = await this.dbService.get(params);
    return data.Item as Todo;
  }

  async createTodo(todo: Todo): Promise<Todo> {
    const params = {
      TableName: this.tableName,
      Item: todo,
    };
    await this.dbService.put(params);
    return todo;
  }

  async updateTodo(todo: Todo): Promise<Todo> {
    const params = {
      TableName: this.tableName,
      Item: todo,
    };
    await this.dbService.put(params);
    return todo;
  }

  async deleteTodoById(id: string): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: {
        id: id,
      },
    };
    await this.dbService.delete(params);
  }
}
