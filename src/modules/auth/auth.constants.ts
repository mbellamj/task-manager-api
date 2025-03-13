import { get } from 'env-var';

export const authConstants = {
  jwt: {
    secret: get('JWT_SECRET').default('jwtDefaultSecret').asString(),
    expireIn: get('JWT_EXPIRE_IN').default('1h').asString(),
  },
};
