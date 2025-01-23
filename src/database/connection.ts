import { Sequelize } from "sequelize";

const sequelize= new Sequelize('api_node', 'root', '1234',{
    host: 'localhost',
    dialect: 'mysql'
})

export default sequelize