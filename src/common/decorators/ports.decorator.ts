import { Inject } from '@nestjs/common';

import { ClassOrFunction } from '../interfaces/types';
import {
  getEncryptionPort,
  getRepositoryPort,
  getTokenPort,
} from '../utils/ports.utils';

export const InjectRepositoryPort = (value?: string | ClassOrFunction) =>
  Inject(getRepositoryPort(value));

export const InjectTokenPort = (value?: ClassOrFunction) =>
  Inject(getTokenPort(value));

export const InjectEncryptionPort = (value?: ClassOrFunction) =>
  Inject(getEncryptionPort(value));
