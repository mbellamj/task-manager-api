/**
 * Represents pagination metadata, including next/previous page numbers,
 * total pages, and total items.
 */
export class PaginationTracker {
  /**
   * The next page number, if available.
   * Must be a positive integer.
   */
  next?: number;

  /**
   * The previous page number, if available.
   * Must be a positive integer.
   */
  prev?: number;

  /**
   * The total number of pages available.
   * Must be a positive integer.
   */
  pages?: number;

  /**
   * The total number of items available.
   * Must be a positive integer.
   */
  total?: number;
}
