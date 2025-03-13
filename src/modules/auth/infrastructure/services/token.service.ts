import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { map, Observable, of } from 'rxjs';

import { TokenPort } from '@/common/interfaces/token.port';
import { authConstants } from '../../auth.constants';

@Injectable()
export class TokenService implements TokenPort<any> {
  private readonly logger = new Logger(TokenService.name);

  constructor(private readonly jwtService: JwtService) {}

  generate(value: any): Observable<string> {
    this.logger.log(`generating token...`);

    return of(
      this.jwtService.sign(value, { secret: authConstants.jwt.secret }),
    ).pipe(
      map((token) => {
        this.logger.log('Token generated successfully !');
        return token;
      }),
    );
  }

  verify(token: string): Observable<any> {
    this.logger.log(`verifying token...`);
    return of(this.jwtService.verify(token));
  }
}
