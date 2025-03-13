import { registerAs } from '@nestjs/config';
import { get } from 'env-var';

export default registerAs('app', () => ({
  version: get('APP_VERSION').default('1.0'),
  host: '', //will be define when the application started
  port: get('API_PORT').default('3001').asPortNumber(),
  isProduction: get('NODE_ENV').asString() === 'production',
  devtoolPort: get('API_DEVTOOL_PORT').default('3011').asPortNumber(),
}));
