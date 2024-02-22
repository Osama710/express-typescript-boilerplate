import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './database.config';
import Users from './users.model';

interface FailedLoginAttemptAttributes {
    id: number;
    user_id: number;
    ip_address: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

interface FailedLoginAttemptCreationAttributes extends Optional<FailedLoginAttemptAttributes, 'id'> {}

class FailedLoginAttempt extends Model<FailedLoginAttemptAttributes, FailedLoginAttemptCreationAttributes> implements FailedLoginAttemptAttributes {
    public id!: number;
    public user_id!: number;
    public ip_address!: string;
    public created_at?: Date;
    public updated_at?: Date;
    public deleted_at?: Date;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

const json_schema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'id'
        }
    },
    ip_address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
};

FailedLoginAttempt.init(json_schema, { sequelize, paranoid: true, timestamps: true, underscored: true, createdAt: 'created_at', updatedAt: 'updated_at', deletedAt: 'deleted_at' });

// Define the association
FailedLoginAttempt.belongsTo(Users, { foreignKey: 'user_id' });

export default FailedLoginAttempt;
