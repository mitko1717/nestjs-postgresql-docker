import { CreateUserDto } from './dto/create-user.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

// goal of controller - getting requests
// routing mechanism controlls which controller will get request

@Controller('users')
export class UsersController {
    // inject service
    constructor(private userService: UsersService) {} 

    // endpoints
    @Post() // body of request of userDto type
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto)
    }

    @Get()
    getAll() {
        return this.userService.getAllUsers()
    }
}
