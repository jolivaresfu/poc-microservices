export default {
    type: 'mysql',
    name: 'carts-db',
    host: 'localhost',
    username: 'root',
    password: 'root',
    database: 'carts_db',
    port: 3306,
    logging: 'true'.split(' '),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
    keepConnectionAlive: true,
};