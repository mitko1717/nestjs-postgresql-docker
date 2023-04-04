import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface RoleCreationAttrs {
    email: string;
    password: string
}

// describing how to save user in db
@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
    @ApiProperty({ example: '1', description: 'unique id' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'ADMIN', description: 'unique role value' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    value: string;

    @ApiProperty({ example: 'admininstrator', description: 'role description' })
    @Column({ type: DataType.STRING, allowNull: false })
    description: string;
}