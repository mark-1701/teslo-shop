# Descripción

... descripción.

## Correr en dev

1. Clonar el repositorio.
2. Crear una copia del archivo `.env.template` y renombrarlo a `.env` y cambiar las variables de entorno.
3. Instalar la dependencias `npm install`.
4. Levantar la base de datos `docker compose up -d`.
5. Correr las migraciones de Prisma `npx migrate dev`.
6. Crear el cliente de Prisma `npx prisma generate`.
7. Ejecutar seed `npm run seed`
8. Correr el proyecto `npm run dev`.
9. Limpiar el localStorage del navegador.