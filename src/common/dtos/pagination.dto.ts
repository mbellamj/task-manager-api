import { IsInt, IsOptional, IsPositive, Max, Min } from 'class-validator';

/**
 * Represents query parameters for paginated requests,
 * including pagination settings and optional filtering conditions.
 */
export class Pagination {
  /**
   * The current page number for pagination.
   * Must be a positive integer if provided.
   */
  @Min(1)
  @IsInt()
  @IsPositive()
  @IsOptional()
  page?: number = 1;

  /**
   * The number of items to retrieve per page.
   * Must be a positive integer if provided.
   */
  @Max(25)
  @Min(2)
  @IsInt()
  @IsPositive()
  @IsOptional()
  limit?: number = 10;
}
