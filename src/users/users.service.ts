import { RolesService } from './../roles/roles.service';
import { User } from './users.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';

// service responses for keeping and finding of data - make app logic.

@Injectable()
export class UsersService {

    // userRepository is a model - with help of repository connect with DB
    constructor(@InjectModel(User) private userRepository: typeof User,
            private roleService: RolesService) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto)
        const role = await this.roleService.getRoleByValue('user')
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user
    }

    async getAllUsers() {
        // to load users with their roles define in findAll method
        const users = await this.userRepository.findAll({ include: { all: true } })
        return users
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email }, include: { all: true }  })
        return user
    }
}
