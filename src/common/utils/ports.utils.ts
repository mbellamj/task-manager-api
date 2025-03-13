import {
  ENCRYPTION_PORT,
  REPOSITORY_PORT,
  TOKEN_PORT,
} from '../constants/ports.contants';
import { ClassOrFunction } from '../interfaces/types';

function getPort(port: string, value?: string | ClassOrFunction) {
  if (!value) return port;
  if (typeof value === 'string') return `${value}${port}`;
  return `${value.name}${port}`;
}

export function getRepositoryPort(value?: string | ClassOrFunction) {
  return getPort(REPOSITORY_PORT, value);
}

export function getTokenPort(value?: string | ClassOrFunction) {
  return getPort(TOKEN_PORT, value);
}

export function getEncryptionPort(value?: string | ClassOrFunction) {
  return getPort(ENCRYPTION_PORT, value);
}
