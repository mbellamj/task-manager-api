import { PaginationTracker } from './pagination-tracker.dto';

/**
 * Represents a paginated query result containing an array of data items
 * and optional pagination metadata.
 */
export class PaginatedResult<T = unknown> {
  /**
   * The array of data items of type `T`.
   * This field is required.
   */
  data: T[];

  /**
   * Optional pagination metadata, containing information about
   * the total number of pages, next/previous pages, etc.
   */
  pagination?: PaginationTracker;
}
