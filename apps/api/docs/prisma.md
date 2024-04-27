# Prisma

## Instalation
````
$ yarn add -D prisma
````
````
$ yarn add @prisma/client
````
````
$ yarn prisma init
````
## Prisma CLI - Generate client and schema
````
$ yarn prisma generate
````

## Create migration and apply
````
$ yarn prisma migrate dev --name create-database-structure
````

## Apply migration
````
$ yarn prisma migrate dev
````

## Apply seed (reference in package.json)
````
$ yarn prisma db seed
````