import { IsJWT } from 'class-validator';

export class TokenDto {
  @IsJWT()
  private readonly access_token: string;

  constructor(access_token: string) {
    this.access_token = access_token;
  }
}
