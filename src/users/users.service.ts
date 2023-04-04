import { User } from './users.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';

// service responses for keeping and finding of data - make app logic.

@Injectable()
export class UsersService {

    // userRepository is a model - with help of repository connect with DB
    constructor(@InjectModel(User) private userRepository: typeof User) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto)
        return user
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll()
        return users
    }
}
