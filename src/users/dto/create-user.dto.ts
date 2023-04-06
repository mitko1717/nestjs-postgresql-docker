// dto - no logic, only fields
// it's being used for data exchange between client & server

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length} from 'class-validator';

// this dto for creating user
export class CreateUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'email' })
  @IsString({ message: 'have to be a string' })
  @IsEmail({}, { message: "incorrect email" })
  readonly email: string;
  @ApiProperty({ example: '12344321', description: 'password' })
  @IsString({ message: 'have to be a string' })
  @Length(4, 16, { message: 'not less than 4 and not more than 16' })
  readonly password: string;
}
