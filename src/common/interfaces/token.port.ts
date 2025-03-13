import { Observable } from 'rxjs';

export interface TokenPort<T = any> {
  generate(value: T): Observable<string>;
  verify(token: string): Observable<T>;
}
