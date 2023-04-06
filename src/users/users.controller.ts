import { ValidationPipe } from './../pipes/validation.pipe';
import { RolesGuard } from './../auth/roles.quard';
// import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

// goal of controller - getting requests
// routing mechanism controlls which controller will get request
// to make controller work - nedd to register it in module
// add service into instructor to use class object
// nest response for creating
// controller shouldn't contain logic, only get request and return response

@ApiTags('users')
@Controller('users')
export class UsersController {
  // inject service
  constructor(private userService: UsersService) {}

  // endpoints

  @ApiOperation({ summary: 'user creating' })
  @ApiResponse({ status: 200, type: User })
  // @UsePipes(ValidationPipe)
  @Post() // body of request of userDto type
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: 'get all users' })
  @ApiResponse({ status: 200, type: [User] })
  // UseGuards to restrict access to some endpoint
  // @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'set role' })
  @ApiResponse({ status: 200 })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }

  @ApiOperation({ summary: 'ban user' })
  @ApiResponse({ status: 200 })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post('/ban')
  ban(@Body() dto: BanUserDto) {
    return this.userService.ban(dto);
  }
}
