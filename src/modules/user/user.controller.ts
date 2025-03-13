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

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserQueryFilter } from './dtos/user-query-filter.dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Creates a new user.
   *
   * This endpoint allows public users to register a new account.
   *
   * @param {CreateUserDto} createUserDto - DTO containing user details.
   * @returns {Observable<User>} The newly created user.
   *
   * @example
   * // Sample request body
   * {
   *   "firstName": "John",
   *   "lastName": "Doe",
   *   "email": "john.doe@example.com",
   *   "password": "SecureP@ss123"
   * }
   *
   * @throws {201} User created successfully.
   * @throws {400} Bad request: Invalid input data.
   * @throws {500} Internal server error: Something went wrong.
   */
  @Post()
  // @Public()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  /**
   * Retrieves all users with optional paginated query parameters.
   *
   * Only accessible by admin users.
   *
   * @param {UserQueryFilter} query - Pagination parameters.
   * @returns {Observable<PaginatedResult<User>>} A paginated list of users.
   *
   * @example
   * // Sample request query
   * ?page=1&limit=10
   *
   * @throws {200} Users retrieved successfully.
   * @throws {400} Bad request: Invalid pagination parameters.
   * @throws {500} Internal server error: Something went wrong.
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query() query: UserQueryFilter) {
    return this.userService.findAll(query);
  }

  /**
   * Retrieves a single user by their ID.
   *
   * Accessible by both users and admins.
   *
   * @param {string} id - The unique ID of the user.
   * @returns {Observable<User>} The requested user if found.
   *
   * @example
   * // Sample request
   * GET /users/123
   *
   * @throws {200} User retrieved successfully.
   * @throws {404} Not found: User does not exist.
   * @throws {500} Internal server error: Something went wrong.
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne({ id });
  }

  /**
   * Updates an existing user's information.
   *
   * Accessible by both users (to update their own profile) and admins.
   *
   * @param {string} id - The ID of the user to update.
   * @param {UpdateUserDto} updateUserDto - DTO containing updated data.
   * @returns {Observable<User>} The updated user details.
   *
   * @example
   * // Sample request body
   * {
   *   "firstName": "John",
   *   "name": "Smith"
   * }
   *
   * @throws {200} User updated successfully.
   * @throws {400} Bad request: Invalid input data.
   * @throws {404} Not found: User does not exist.
   * @throws {500} Internal server error: Something went wrong.
   */
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  /**
   * Deletes a user by their ID.
   *
   * Accessible by both users (to delete their own account) and admins.
   *
   * @param {string} id - The ID of the user to delete.
   * @returns {void} No content is returned on successful deletion.
   *
   * @example
   * // Sample request
   * DELETE /users/123
   *
   * @throws {204} User deleted successfully.
   * @throws {404} Not found: User does not exist.
   * @throws {500} Internal server error: Something went wrong.
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.remove({ id });
  }
}
