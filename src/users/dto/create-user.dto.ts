// dto - no logic, only fields
// it's being used for data exchange between client & server

import { ApiProperty } from "@nestjs/swagger";

// this dto for creating user
export class CreateUserDto {
    @ApiProperty({ example: 'user@gmail.com', description: 'email' })
    readonly email: string;
    @ApiProperty({ example: '12344321', description: 'password' })
    readonly password: string;
}