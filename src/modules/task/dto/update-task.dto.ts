import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';

/**
 * Data Transfer Object (DTO) for updating a task.
 * Inherits from `CreateTaskDto` but makes all fields optional.
 */
export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
