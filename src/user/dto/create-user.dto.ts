import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.com', description: 'unique email' })
  readonly email: string;

  @ApiProperty({ example: 'John.Doe', description: 'unique usermane' })
  readonly username: string;

  @ApiProperty({ example: 'qwerty1234', description: 'Password' })
  readonly password: string;
}
