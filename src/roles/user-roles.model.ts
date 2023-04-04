import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Role } from "./roles.model";

        // options
@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    // foreignKey for sequelize undestand that it's external key
    @ForeignKey(() => Role)
    @Column({ type: DataType.INTEGER })
    roleId: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;
}