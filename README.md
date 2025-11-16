<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h1 align="center">Challenge Interbanking<h1>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
</p>

## Instalación de proyecto

```bash
$ npm install
```

## Compilar y correr el proyecto

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Correr tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Desafío Técnico

Evaluarla capacidad técnica, criterio de diseño, y nivel de autonomía de los
candidatos. Este desafío no requiere despliegue en la nube ni ejecución de
servicios reales en AWS, pero sí incluye ejercicios de diseño relacionados.



## Descripción General

La tarea consiste en construir APIs que permitan gestionar información sobre
empresas y sus transferencias. La solución deberá ser clara, mantenible,
escalable y escrita con buenas prácticas (Clean Code, separación de
responsabilidades, claridad en los nombres, etc.)



## Requerimientos funcionales

Debes implementar los siguientes **3 endpoints:**

1. **Obtener las empresas que realizaron transferencias en el último mes.**
2. **Obtener las empresas que se adhirieron en el último mes.**
3. **Registrar la adhesión de una nueva empresa:**
   a.    Empresa Pyme
   
   b.    Empresa Corporativa.



## Requerimientos no funcionales

- La API debe estar escrita en NestJs (standalone).
- No se permite el uso de Docker.
- No es necesario desplegar la API, pero debe poder ejecutarse localmente.
- Se puede usar base de datos local, un archivo JSON o persistencia en memoria.
- Si usás base de datos (relacional o no relacional), incluí una instancia embebida, simulada o en Cloud.
- Usá una arquitectura clara (idealmente Clean Architecture, Hexagonal, etc.)

  -  Deseable: Hexagonal.



## Parte adicional (AWS - Teórica)



Diseñar una Lambda Function de AWS que reciba una solicitud de adhesión de empresa (como en el punto 3), valide los datos y los almacene.

**Incluí:**

- Código de la Lambda

- Input/output esperados (formato JSON)

- Breve explicación de cómo la integrarías con el sistema

*La Lambda no debe ser ejecutada ni desplegada. Solo necesitamos el diseño funcional y su código fuente*

## Paso a Paso

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## 
