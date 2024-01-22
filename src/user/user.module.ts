import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.model';
import { RoleModule } from 'src/role/role.module';
import { Role } from 'src/role/role.model';
import { UserRoles } from 'src/role/user-roles.model';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [SequelizeModule.forFeature([User, Role, UserRoles]), RoleModule],
  exports: [UserService],
})
export class UserModule {}
