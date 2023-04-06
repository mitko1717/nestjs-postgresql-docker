import { User } from './../users/users.model';
import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { UserRoles } from './user-roles.model';

interface RoleCreationAttrs {
    email: string;
    password: string
}

// describing how to save role in db
@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
    @ApiProperty({ example: '1', description: 'unique id' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'admin', description: 'unique role value' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    value: string;

    @ApiProperty({ example: 'admininstrator', description: 'role description' })
    @Column({ type: DataType.STRING, allowNull: false })
    description: string;

    // point entity to connect with and table we make it
    @BelongsToMany(() => User, () => UserRoles)
    users: User[]
}