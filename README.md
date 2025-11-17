<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h1 align="center">Challenge Interbanking<h1>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
</p>

## Requisitos previos

- Node.js 18+ y npm
- Base de datos PostgreSQL accesible y una variable de entorno `DATABASE_URL` con el string de conexión.

Ejemplo de `.env` local:

```env
DATABASE_URL=DATABASE_URL=postgresql://postgres.moapvggmuasajjoyhfrc:so0O8g65wxPoSnvo@aws-0-us-west-2.pooler.supabase.com:5432/postgres
```

La configuración de TypeORM se carga desde `AppModule` y utiliza esta URL para registrar la entidad `company`. Asegurate de tener el esquema creado o habilitar `synchronize` en el `TypeOrmModule` si querés que se genere automáticamente.

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

```

# Desafío Técnico

### Descripción General

La tarea consiste en construir APIs que permitan gestionar información sobre empresas y sus transferencias. La solución deberá ser clara, mantenible, escalable y escrita con buenas prácticas (Clean Code, separación de responsabilidades, claridad en los nombres, etc.)

### Endpoints disponibles

| Método | Ruta | Descripción |
| --- | --- | --- |
| `POST` | `/company/create` | Crea una empresa validando los datos con `class-validator` y persistiéndolos vía TypeORM. |
| `GET` | `/company/companies-added` | Lista empresas con fecha de adhesión en los últimos 30 días. |
| `GET` | `/company/company-transfers/:idCompany` | Obtiene las empresas que registraron transferencias en los últimos 30 días. |

> Los controladores NestJS están definidos en `src/context/Companies/infrastructure/Nestjs/company.controller.ts`. Los DTO con ejemplos de payload se encuentran en `src/context/Companies/infrastructure/Nestjs/Company.dto.ts`.

## Paso a Paso realizado con arquitectura hexagonal

Este proyecto fue realizado con Nest.js utilizando su version standalone y con arquitectura hexagonal, implementando módulos dentro de un contexto. Tomé esta decisión ya que considero que es una solucion más escalable y agnostica, si en algun momento se necesita implementar cualquier framework de backend en la misma.

### Domain

Para comenzar con el challenge, cree la entidad Company dentro de esta carpeta para crear la estructura del negocio. Como todo el proyecto apuntaba a la entidad de empresas, decidí utilizar "Company" y fui modelando el objeto hasta crear una llamada similar a la de un banco. Tambien creé el repositorio que contiene las implementaciones de los endpoints. Y por ultimo, agregué las validaciones y las excepciones de errores correspondientes a la entidad.

### Applications

Dentro de esta categoría situé a los casos de uso correspondientes a cada endpoint y como se iban a ejecutar. Mi idea fue separarlos por carpetas, suponiendo que el proyecto escalaria con el tiempo.

Cada funcion "Run" va a recibir la primitiva de los valores que necesite para ser ejecutado. En este punto, se suele utilizar el metodo @Injectable() de nestjs, ya que los casos de uso serían los "servicios" dentro de la arquitectura de servicios pero, en este caso, al tratarse de otra arquitectura preferí implementar los casos de uso como los dice la teoría de la arquitectura hexagonal. Es decir que, La aplicacion solo va a tener comunicacion consigo misma y con los componentes de dominio.
Como Nest es un framwork, este irá dentro de infrastructure.

### Infrastructure

Dentro de esta sección, coloqué todos los framworks que necesitaba para generar las conexiones hacia la base de datos y los controladores necesarios para que el proyecto funcione.
Ademas de eso añadí una sección para AWS en el caso de que se quisiera implementar en la nube.

Tambien, cree una cuenta en supabase para alojar los datos de la base de datos que fue creada con PostgreSQL.

### AWS

Esta Lambda implementa el mismo flujo del endpoint `POST /company/create`, pero preparada para ejecutarse en AWS Lambda con API Gateway.
El handler se encuentra en `src/context/Companies/infrastructure/AWS/create-company.lambda.ts` y reutiliza el caso de uso `CreateCompany` junto con el repositorio TypeORM. Valida la entrada con `class-validator`, inicializa una conexión reutilizable y persiste la empresa en la misma base configurada para la API.

#### Entrada esperada

```json
{
  "legalName": "INTERBANKING S.A.",
  "businessName": "Interbanking",
  "taxId": "30-12345678-9",
  "type": "PYME",
  "contactEmail": "contacto@empresa.com",
  "adhesionDate": "2025-01-17T12:00:00.000Z",
  "contactPhone": "+54-11-5555-5555",
  "address": "Av. Siempre Viva 123, CABA",
  "isActive": true
}
```

#### Respuestas

- **201**

```json
{
  "message": "Empresa almacenada correctamente",
  "legalName": "INTERBANKING S.A.",
  "taxId": "30-12345678-9"
}
```

- **400** – cuando el JSON está mal formado o falla la validación de `class-validator`. El cuerpo incluye `message` y el detalle de cada propiedad inválida.

#### Integración con el sistema

1. **Despliegue**: empaquetar el proyecto con `npm run build` y subir el artefacto que incluya `dist/context/Companies/infrastructure/Aws/create-company.lambda.js`.
2. **API Gateway**: crear una ruta `POST /company/create` apuntando al handler `create-company.lambda.handler` con integración proxy.
3. **Configuración**: definir `DATABASE_URL` (por ejemplo, una instancia RDS) y, en producción, permitir SSL (la Lambda ya ajusta `rejectUnauthorized: false`).
4. **Red**: si la base está en una VPC privada, asociar la Lambda a la VPC/subredes correspondientes.
5. **Reutilización**: el handler comparte el modelo de dominio y el repositorio existente, por lo que los datos quedan disponibles para los endpoints NestJS sin transformaciones adicionales.
