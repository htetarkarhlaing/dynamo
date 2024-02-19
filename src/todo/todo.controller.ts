import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getAllTodos(): Promise<Todo[]> {
    return this.todoService.getAllTodos();
  }

  @Get(':id')
  async getTodoById(@Param('id') id: string): Promise<Todo | null> {
    return this.todoService.getTodoById(id);
  }

  @Post()
  async createTodo(@Body() todo: Todo): Promise<Todo> {
    return this.todoService.createTodo(todo);
  }

  @Put(':id')
  async updateTodo(@Param('id') id: string, @Body() todo: Todo): Promise<Todo> {
    todo.id = id;
    return this.todoService.updateTodo(todo);
  }

  @Delete(':id')
  async deleteTodoById(@Param('id') id: string): Promise<void> {
    return this.todoService.deleteTodoById(id);
  }
}
