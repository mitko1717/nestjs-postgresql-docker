import { AuthModule } from './../auth/auth.module';
import { UserRoles } from 'src/roles/user-roles.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';
import { Role } from 'src/roles/roles.model';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles]),
    RolesModule,
    // to prevent circlular dependency between modules
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
