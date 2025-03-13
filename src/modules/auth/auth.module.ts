import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { ENCRYPTION_PORT, TOKEN_PORT } from '@/common/constants/ports.contants';
import { LocalAuthGuard } from '@/common/guards/local-auth.guard';
import { UserModule } from '../user/user.module';
import { authConstants } from './auth.constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BcryptService } from './infrastructure/services/bcrypt.service';
import { TokenService } from './infrastructure/services/token.service';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { LocalStrategy } from './infrastructure/strategies/local.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: authConstants.jwt.secret,
      signOptions: { expiresIn: authConstants.jwt.expireIn },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    BcryptService,
    LocalAuthGuard,
    LocalStrategy,
    JwtStrategy,
    JwtService,
    {
      provide: ENCRYPTION_PORT,
      useClass: BcryptService,
    },
    {
      provide: TOKEN_PORT,
      useClass: TokenService,
    },
  ],
})
export class AuthModule {}
