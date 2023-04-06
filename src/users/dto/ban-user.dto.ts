// dto - no logic, only fields
// it's being used for data exchange between client & server

import { IsNumber, IsString } from 'class-validator';

export class BanUserDto {
  @IsNumber({}, { message: 'have to be a number' })
  readonly userId: number;
  @IsString({ message: 'have to be a string' })
  readonly banReason: string;
}
