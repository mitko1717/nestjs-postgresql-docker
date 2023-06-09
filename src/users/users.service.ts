import { AddRoleDto } from './dto/add-role.dto';
import { RolesService } from './../roles/roles.service';
import { User } from './users.model';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { BanUserDto } from './dto/ban-user.dto';

// service responses for keeping and finding of data - make app logic.

@Injectable()
export class UsersService {
  // userRepository is a model - with help of repository connect with DB
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('admin');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getAllUsers() {
    // to load users with their roles define in findAll method
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async addRole(dto: AddRoleDto) {
    // get user
    const user = await this.userRepository.findByPk(dto.userId);
    // get role from bd
    const role = await this.roleService.getRoleByValue(dto.value);

    // if conditions true - add new role to default one
    if (role && user) {
      await user.$add('role', role.id);
      return dto;
    }

    throw new HttpException('user or role wasnt found', HttpStatus.NOT_FOUND);
  }

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);

    if (!user)
      throw new HttpException('user wasnt found', HttpStatus.NOT_FOUND);

    user.banned = true;
    user.banReasin = dto.banReason;
    await user.save(); // update value in db
    return user;
  }
}
