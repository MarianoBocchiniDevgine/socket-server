import { Sequelize } from 'sequelize';
import config from './config';


const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    port: config.development.port,
    dialect: 'mysql',
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión Sequelize establecida correctamente.');
  })
  .catch((err: any) => {
    console.error('Error al conectar a la base de datos:', err);
  });

export default sequelize;
