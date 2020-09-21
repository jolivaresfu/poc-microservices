export default {
    type: 'mysql',
    name: 'products-db',
    host: 'localhost',
    username: 'root',
    password: 'root',
    database: 'products_db',
    port: 3306,
    logging: 'true'.split(' '),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
    keepConnectionAlive: true,
};