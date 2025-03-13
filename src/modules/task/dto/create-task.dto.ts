import { OmitType } from '@nestjs/swagger';

import { TaskDto } from '@/common/dtos/task.dto';

/**
 * Data Transfer Object (DTO) for creating a new task.
 * Ensures that all required fields are properly validated.
 */
export class CreateTaskDto extends OmitType(TaskDto, ['id'] as const) {}
