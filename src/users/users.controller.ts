import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// goal of controller - getting requests
// routing mechanism controlls which controller will get request

@ApiTags('users')
@Controller('users')
export class UsersController {
    // inject service
    constructor(private userService: UsersService) {} 

    // endpoints
    @ApiOperation({ summary: 'user creating' })
    @ApiResponse({ status: 200, type: User })
    @Post() // body of request of userDto type
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto)
    }

    @ApiOperation({ summary: 'get all users' })
    @ApiResponse({ status: 200, type: [User] })
    @Get()
    getAll() {
        return this.userService.getAllUsers()
    }
}
