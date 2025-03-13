import { registerAs } from '@nestjs/config';
import { get } from 'env-var';

export default registerAs('database', () => ({
  name: get('DATABASE_NAME').asString(),
  host: get('DATABASE_HOSTNAME').default('localhost').asString(),
  port: get('DATABASE_PORT').default('5432').asPortNumber(),
  username: get('DATABASE_USERNAME').required().asString(),
  password: get('DATABASE_PASSWORD').required().asString(),
  ssl: get('DATABASE_USE_SSL').default('false').asBoolStrict(),
}));
