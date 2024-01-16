import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ example: 'user@mail.com', description: 'unique email' })
  readonly email: string;

  @ApiProperty({ example: 'qwerty1234', description: 'Password' })
  readonly password: string;
}
