<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>
  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>

## Descripcion

Poc de microservicios con REDIS como intermediario de mensajes, y [Nest](https://github.com/nestjs/nest) como framework.


## Explicacion

Utilize Nest como framework para esta POC, ademas de MySQL para la base de datos, y REDIS como cliente tcp para interactuar con los microservicios.

Cada microservicio esta conectado a una base de datos (levantadas por el docker-compose.yaml). Las conexiones se realizaron con [TypeORM](https://docs.nestjs.com/recipes/sql-typeorm).

Cree un http-client para interactuar con los microservicios, y desde aqui enviar los mensajes a REDIS, para que los microservicios los reciban y puedan devolverme la data necesaria.

Cada microservicio es dueño de su data y solo devuelven la informacion que conocen en su base de datos, el http client es el que se encarga de recibir esa data e ir consultando en los distintos microservicios de acuerdo a la data que le entregan.

Todos el proyecto esta hecho para ser dockerizado y utilizado de esa forma. Existe una carpeta mysql-dump, que contiene el volcado de data para la base de datos. El docker compose interpreta ese archivo y cuando levanta la base de datos, vacia el dump en ella.

Ademas el compose levanta todos los microservicios, crea la base de datos mysql y tambien la de redis.

## Requerimientos

- Nodejs v8+
- Docker v18+ (para levantar los microservicios y las base de datos)

## Levantar todo!

```bash
# Run the app to see the logs
$ docker-compose up

# Run in dettached mode
$ docker-compose up -d

# Stop the execution
$ docker-compose down

```

## Documentacion

- [Nest.js](https://docs.nestjs.com/)
- [TypeORM](https://docs.nestjs.com/recipes/sql-typeorm)
- [Nest logger](https://docs.nestjs.com/techniques/logger)


### Desafio

Existen dos usuarios en la BD:

- ID usuario 1: 448d4ec4-fade-11ea-adc1-0242ac120002
- ID usuario 2: 9350ab0c-fb72-11ea-adc1-0242ac120002

Existen 3 pagos en la BD:

- external_reference_id Pago 1: 456
- external_reference_id Pago 2: external_reference_id
- external_reference_id Pago 3: 123


```bash
**Obtenga los productos comprados por un usuario X.**

$ curl localhost:3000/productsPaids/448d4ec4-fade-11ea-adc1-0242ac120002

**Obtenga los productos asociados a una orden de acuerdo al external_reference_id de un pago.**

$ curl localhost:3000/productsByExternalReference/123

**Obtenga los productos del carro de compras de un usuario X.**

$ curl localhost:3000/productsInCart/9350ab0c-fb72-11ea-adc1-0242ac120002

```




