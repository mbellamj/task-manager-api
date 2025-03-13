import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { PaginatedResult } from '../dtos/paginated-result.dto';
import { Pagination } from '../dtos/pagination.dto';

export function paginate<T>({ limit = 10, page = 1 }: Pagination) {
  return (source: Observable<[T[], number]>): Observable<PaginatedResult<T>> =>
    source.pipe(
      map(([values, total]) => {
        // Ensure at least 1 page
        const pages = Math.max(1, Math.ceil(total / limit));
        return {
          data: values,
          pagination: {
            next: page < pages ? page + 1 : undefined,
            prev: page > 1 ? page - 1 : undefined,
            pages,
            total,
          },
        };
      }),
      catchError((error: unknown) => {
        return throwError(() => error);
      }),
    );
}
