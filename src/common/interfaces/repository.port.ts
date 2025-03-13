import { Observable } from 'rxjs';

import { PaginatedResult } from '../dtos/paginated-result.dto';
import { Criteria, Partialize, QueryFilter } from './types';

export interface RepositoryPort<T> {
  create(data: Partialize<T>): Observable<T>;
  update(id: string, data: Partialize<T>): Observable<T>;
  findOne(criteria: Criteria<T>): Observable<T>;
  findAll(query: QueryFilter<T>): Observable<PaginatedResult<T>>;
  remove(criteria: Criteria<T>): Observable<void>;
}
