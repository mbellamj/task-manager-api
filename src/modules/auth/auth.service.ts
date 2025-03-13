import {
  Injectable,
  Logger,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';

import {
  InjectEncryptionPort,
  InjectTokenPort,
} from '@/common/decorators/ports.decorator';
import { Permission } from '@/common/enums/permission.enum';
import { Role } from '@/common/enums/role.enum';
import { EncryptionPort } from '@/common/interfaces/encryption.port';
import { TokenPort } from '@/common/interfaces/token.port';
import { catchError, map, mergeMap, switchMap, throwError } from 'rxjs';
import { UserService } from '../user/user.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { TokenDto } from './dtos/token.dto';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    @InjectEncryptionPort()
    private readonly encryptionPort: EncryptionPort,
    @InjectTokenPort()
    private readonly tokenPort: TokenPort,
  ) {}

  /**
   * @method register Registers a new user.
   * @param registerDto @type RegisterDto
   * @returns @type Observable<TokenDto>
   */
  register(registerDto: RegisterDto) {
    const { email, password, ...rest } = registerDto;

    this.logger.log(`Registering user with email: ${email}`);

    return this.encryptionPort.hash(password).pipe(
      switchMap((hashedPassword) =>
        this.userService
          .create({
            email,
            password: hashedPassword,
            roles: [Role.USER],
            permissions: [Permission.READ],
            ...rest,
          })
          .pipe(
            mergeMap((user) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { password, ...data } = user;

              return this.tokenPort
                .generate(data)
                .pipe(map((token) => new TokenDto(token)));
            }),
          ),
      ),
    );
  }

  /**
   * @method authenticate Authenticates a user credentials (e.g., compare hashed password).
   * @param loginDto @type LoginDto - User's credentials email and password
   * @returns @type User object if valid, null otherwise
   */
  authenticate(loginDto: LoginDto) {
    this.logger.log(`Authenticating user with email: ${loginDto.email}`);

    return this.userService.findOne({ email: loginDto.email }).pipe(
      switchMap((user) => {
        return this.encryptionPort
          .compare(loginDto.password, user.password)
          .pipe(
            map((isPasswordValid) => {
              if (!isPasswordValid) {
                this.logger.warn(
                  `Invalid credentials for email: ${loginDto.email}`,
                );
                throw new UnauthorizedException(
                  `Invalid credentials for email: ${loginDto.email}`,
                );
              }

              this.logger.log(`User ${user.email} authenticated`);

              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { password, ...result } = user;
              return result;
            }),
          );
      }),
      catchError(() => {
        this.logger.warn(`User ${loginDto.email} unauthorized`);

        return throwError(
          () =>
            new UnauthorizedException(`User ${loginDto.email} unauthorized`),
        );
      }),
    );
  }

  login(data: unknown) {
    this.logger.log(`Login...`);

    return this.tokenPort.generate(data).pipe(
      map((token) => new TokenDto(token)),
      catchError((error: unknown) => {
        this.logger.error('Access Token Not Available', error);

        return throwError(
          () => new UnauthorizedException('Access Token Not Available'),
        );
      }),
    );
  }
}
