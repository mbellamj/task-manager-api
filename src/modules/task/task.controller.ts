import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';

import { CreateTaskDto } from './dto/create-task.dto';
import { TaskQueryFilter } from './dto/task-query-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';

@ApiTags('tasks')
@ApiExtraModels(TaskQueryFilter)
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  /**
   * Creates a new task.
   *
   * This operation allows authenticated users to create a task by providing
   * a name and other necessary details.
   *
   * @param {CreateTaskDto} createTaskDto - DTO containing the task details.
   * @returns {Observable<Task>} The newly created task.
   *
   * @example
   * // Sample request body
   * {
   *   "targetId": "c6b8f9ab-5500-4f75-8bb0-aa07113da67b",
   *   "title": "Complete project",
   *   "description": "Finish the pending project tasks",
   *   "dueDate": "2025-02-20T10:00:00Z"
   * }
   *
   * @throws {201} Task created successfully.
   * @throws {400} Bad request: Invalid input data.
   * @throws {500} Internal server error: Something went wrong.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  /**
   * Retrieves all tasks with optional pagination.
   *
   * This endpoint supports pagination to fetch a list of tasks.
   *
   * @param {TaskQueryFilter} query - Pagination parameters.
   * @returns {Observable<PaginatedResult<Task>>} A paginated list of tasklists.
   *
   * @example
   * // Sample request query
   * ?page=1&limit=10&targetId=<user UUID>
   *
   * @throws {200} Tasks retrieved successfully.
   * @throws {400} Bad request: Invalid pagination parameters.
   * @throws {500} Internal server error: Something went wrong.
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query() query: TaskQueryFilter) {
    return this.taskService.findAll(query);
  }

  /**
   * Retrieves a single task by its unique identifier.
   *
   * @param {string} id - The unique ID of the task.
   * @returns {Observable<Task>} The requested task if found.
   *
   * @example
   * // Sample request
   * GET /tasks/123
   *
   * @throws {200} Task retrieved successfully.
   * @throws {404} Not found: Task does not exist.
   * @throws {500} Internal server error: Something went wrong.
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.taskService.findOne({ id });
  }

  /**
   * Updates an existing task.
   *
   * This endpoint allows users to update task details such as the name.
   *
   * @param {string} id - The ID of the task to update.
   * @param {UpdateTaskDto} updateTaskDto - DTO containing the updated data.
   * @returns {Observable<Task>} The updated task.
   *
   * @example
   * // Sample request body
   * {
   *   "title": "Updated task title",
   *   "description": "Updated description",
   *   "dueDate": "2025-02-25T15:00:00Z"
   * }
   *
   * @throws {200} Task updated successfully.
   * @throws {400} Bad request: Invalid input data.
   * @throws {404} Not found: Task does not exist.
   * @throws {500} Internal server error: Something went wrong.
   */
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.update(id, updateTaskDto);
  }

  /**
   * Deletes a task by its unique identifier.
   *
   * This operation permanently removes a task from the system.
   *
   * @param {string} id - The ID of the task to delete.
   * @returns {Observable<void>} No content is returned on successful deletion.
   *
   * @example
   * // Sample request
   * DElETE /tasks/c6b8f9ab-5500-4f75-8bb0-aa07113da67a
   *
   * @throws {204} Task deleted successfully.
   * @throws {404} Not found: Task does not exist.
   * @throws {500} Internal server error: Something went wrong.
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.taskService.remove({ id });
  }
}
