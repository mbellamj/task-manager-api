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
import { ApiTags } from '@nestjs/swagger';

import { User } from '@/common/decorators/user.decorator';
import { CreateTasklistDto } from './dto/create-tasklist.dto';
import { TasklistQueryFilter } from './dto/tasklist-query-filter.dto';
import { UpdateTasklistDto } from './dto/update-tasklist.dto';
import { TasklistService } from './tasklist.service';

@ApiTags('tasklists')
@Controller('tasklists')
export class TasklistController {
  constructor(private readonly tasklistService: TasklistService) {}

  /**
   * Creates a new task list.
   *
   * This operation allows authenticated users to create a task list by providing
   * a name and other necessary details.
   *
   * @param {CreateTasklistDto} createTasklistDto - DTO containing the task list details.
   * @returns {Observable<Tasklist>} The newly created task list.
   *
   * @example
   * // Sample request body
   * {
   *   "name": "My Tasklist 1"
   * }
   *
   * @throws {201} Task list created successfully.
   * @throws {400} Bad request: Invalid input data.
   * @throws {500} Internal server error: Something went wrong.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createDto: CreateTasklistDto,
    @User('id', ParseUUIDPipe) userId: string,
  ) {
    return this.tasklistService.create({ ...createDto, targetId: userId });
  }

  /**
   * Retrieves all task lists with optional pagination.
   *
   * This endpoint supports pagination to fetch a list of task lists.
   *
   * @param {TasklistQueryFilter} query - Pagination parameters.
   * @returns {Observable<PaginatedResult<Tasklist>>} A paginated list of tasklists.
   *
   * @example
   * // Sample request query
   * ?page=1&limit=10&targetId=<user UUID>
   *
   * @throws {200} Task lists retrieved successfully.
   * @throws {400} Bad request: Invalid pagination parameters.
   * @throws {500} Internal server error: Something went wrong.
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(
    @Query() query: TasklistQueryFilter,
    @User('id', ParseUUIDPipe) userId: string,
  ) {
    return this.tasklistService.findAll({ ...query, targetId: userId });
  }

  /**
   * Retrieves a single task list by its unique identifier.
   *
   * @param {string} id - The unique ID of the task list.
   * @returns {Observable<Tasklist>} The requested task list if found.
   *
   * @example
   * // Sample request
   * GET /tasklists/c6b8f9ab-5500-4f75-8bb0-aa07113da67b
   *
   * @throws {200} Task list retrieved successfully.
   * @throws {404} Not found: Task list does not exist.
   * @throws {500} Internal server error: Something went wrong.
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.tasklistService.findOne({ id });
  }

  /**
   * Updates an existing task list.
   *
   * This endpoint allows users to update task list details such as the name.
   *
   * @param {string} id - The ID of the task list to update.
   * @param {UpdateTasklistDto} updateTasklistDto - DTO containing the updated data.
   * @returns {Observable<Tasklist>} The updated task list.
   *
   * @example
   * // Sample request body
   * {
   *   "name": "Updated Task list Name"
   * }
   *
   * @throws {200} Task list updated successfully.
   * @throws {400} Bad request: Invalid input data.
   * @throws {404} Not found: Task list does not exist.
   * @throws {500} Internal server error: Something went wrong.
   */
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTasklistDto: UpdateTasklistDto,
  ) {
    return this.tasklistService.update(id, updateTasklistDto);
  }

  /**
   * Deletes a task list by its unique identifier.
   *
   * This operation permanently removes a task list from the system.
   *
   * @param {string} id - The ID of the task list to delete.
   * @returns {void} No content is returned on successful deletion.
   *
   * @example
   * // Sample request
   * DElETE /tasklists/c6b8f9ab-5500-4f75-8bb0-aa07113da67e
   *
   * @throws {204} Task list deleted successfully.
   * @throws {404} Not found: Task list does not exist.
   * @throws {500} Internal server error: Something went wrong.
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tasklistService.remove({ id });
  }
}
