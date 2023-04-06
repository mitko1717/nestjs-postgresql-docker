// dto - no logic, only fields
// it's being used for data exchange between client & server

import { IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @IsString({ message: 'have to be a string' })
  readonly value: string;
  @IsNumber({}, { message: 'have to be a number' })
  readonly userId: number;
}
