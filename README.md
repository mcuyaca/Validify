# Validify
![750shots_so](https://github.com/mcuyaca/Validify/assets/132428045/40079029-122f-4d6c-932b-4a14ed90477f)
## Descripción

Validify es una aplicación Full Stack que tiene como objetivo permitir a los usuarios autenticados y con el rol `admin` cargar archivos CSV para la creación de registros en una base de datos PostgreSQL.

## Tabla de contenidos

- [Funcionalidades](#funcionalidades)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Contribución](#contribución)
- [Licencia](#licencia)

## Funcionalidades

- **Autenticación de Usuario:**

  - Inicio de sesión con nombre de usuario.
  - Persistencia de sesión para acceso directo a la vista principal.

- **Roles de Usuario:**

  - Se implementa un sistema de roles de usuario, administradores y otros usuarios.
  - Solo los administradores tienen permiso para cargar archivos.

- **Carga de Archivos:**

  - Los administradores pueden cargar archivos CSV a través de la aplicación para crear registros en la base de datos PostgresSQL.

- **Validación de Datos**

  - Antes de crear los registros en la base de datos, la aplicación valida los datos del archivo CSV para garantizar su integridad y consistencia.

- **Correción de registos inválidos**
  - En caso de registros inválidos, la aplicación permite a los usuarios corregir los datos antes de realizar la carga.

## Tecnologías

- Frontend: React, Typescript, TailwindCSS
- Backend: NodeJS, Typescript, Express
- Base de datos : PostgreSQL
- Autenticación/Autorización: JSON Web Tokens
- Testing: Vitest

## Instalación

1. Clona este repositorio: `git clone https://github.com/mcuyaca/Validify.git`
2. Instala las dependencias: `npm install`
3. Inicia la aplicación: `npm start`

## Contribución

Si deseas contribuir a CodeableKeep, sigue estos pasos:

1. Crea un fork del repositorio.
2. Crea tu rama de características: `git checkout -b feature/NuevaCaracteristica`
3. Realiza tus cambios y haz commit: `git commit -m 'Añade NuevaCaracteristica'`
4. Sube tus cambios: `git push origin feature/NuevaCaracteristica`
5. Crea un Pull Request en GitHub.

## Licencia

Este proyecto está bajo la Licencia MIT.
