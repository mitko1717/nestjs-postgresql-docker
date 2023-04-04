// dto - no logic, only fields
// it's being used for data exchange between client & server

// this dto for creating user
export class CreateUserDto {
    readonly email: string;
    readonly password: string;
}