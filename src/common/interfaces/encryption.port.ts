import { Observable } from 'rxjs';

export interface EncryptionPort {
  hash(value: string): Observable<string>;
  compare(value: string, hash: string): Observable<boolean>;
}
