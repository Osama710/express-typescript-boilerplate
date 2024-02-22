import { Sequelize } from 'sequelize';

// Create a Sequelize instance that connects to the MySQL database
const sequelize = new Sequelize(process.env.DB_DATABASE!, process.env.DB_USERNAME!, process.env.DB_PASSWORD!, {
    host: process.env.DB_HOST!,
    dialect: process.env.DB_CONNECTION as any // Assuming DB_CONNECTION is a string
});

export default sequelize;
