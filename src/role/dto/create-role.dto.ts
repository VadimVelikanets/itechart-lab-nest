import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Admin Rolse' })
  readonly value: string;

  @ApiProperty({ example: 'Admin role', description: 'Role description' })
  readonly description: string;
}
