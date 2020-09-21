export default {
    type: 'mysql',
    name: 'orders-db',
    host: 'mysql',
    username: 'root',
    password: 'root',
    database: 'orders_db',
    port: 3306,
    logging: 'true'.split(' '),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
    keepConnectionAlive: true,
};