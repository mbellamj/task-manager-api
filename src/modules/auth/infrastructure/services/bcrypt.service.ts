import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { get } from 'env-var';
import { from } from 'rxjs';

import { EncryptionPort } from '@/common/interfaces/encryption.port';

const bcryptConstants = {
  saltRounds: get('BCRYPT_SALT_ROUNDS').default(10).asIntPositive(),
};
@Injectable()
export class BcryptService implements EncryptionPort {
  hash(value: string) {
    return from(bcrypt.hash(value, bcryptConstants.saltRounds));
  }

  compare(value: string, hash: string) {
    return from(bcrypt.compare(value, hash));
  }
}
