# Payless API

API REST para la gestión de inventario de zapatos Payless por ciudad, con autenticación JWT, control de acceso por roles, validación de datos y documentación Swagger.

## Descripción general

Este proyecto expone una API construida con Express y Firebase Admin SDK. La aplicación permite:

- Registrar y autenticar usuarios.
- Generar y validar tokens JWT.
- Proteger rutas por rol.
- Crear, listar, actualizar y eliminar zapatos por ciudad.
- Consultar inventario agregado por ciudad.
- Visualizar la documentación de la API con Swagger.

La aplicación está preparada para ejecutarse en local y para desplegarse en Vercel.

## Ruta de despliegue

- Producción: https://payless-api.vercel.app/
- Alias de despliegue: payless-894lnmskc-benchavs-projects.vercel.app

## Tecnologías utilizadas

- Node.js
- Express
- Firebase Admin SDK
- JWT
- Joi
- bcryptjs
- CORS
- Helmet
- Compression
- Morgan
- express-rate-limit
- Swagger UI

## Estructura del proyecto

```text
payless-api/
├── README.md
├── package.json
├── vercel.json
├── .gitignore
└── src/
	├── app.js
	├── index.js
	├── server.js
	├── config/
	│   └── firebase.js
	├── controllers/
	│   ├── auth.controller.js
	│   ├── chontales.controller.js
	│   ├── granada.controller.js
	│   ├── jinotepe.controller.js
	│   ├── managua.controller.js
	│   └── masaya.controller.js
	├── middleware/
	│   ├── auth.middleware.js
	│   ├── authorize.middleware.js
	│   └── validate.body.js
	├── models/
	│   ├── shoe.model.js
	│   ├── shoe.schema.js
	│   ├── user.model.js
	│   └── user.schema.js
	├── routes/
	│   ├── auth.routes.js
	│   └── locations.routes.js
	├── services/
	│   ├── auth.service.js
	│   ├── chontales.service.js
	│   ├── granada.service.js
	│   ├── jinotepe.service.js
	│   ├── managua.service.js
	│   └── masaya.service.js
	└── utils/
		└── logger.js
```

## Funciona el proyecto

### Flujo general

1. El cliente hace una petición HTTP a una ruta pública o protegida.
2. Si la ruta requiere autenticación, el middleware JWT valida el token.
3. Si la ruta requiere autorización, se verifica el rol del usuario.
4. El controlador recibe la solicitud y aplica la lógica de negocio.
5. El servicio ejecuta operaciones sobre Firebase Firestore.
6. La respuesta se devuelve al cliente en formato JSON.

### Arquitectura por capas

- app.js: configura Express, middlewares globales, Swagger y rutas principales.
- routes: define los endpoints disponibles.
- middleware: valida body, autentica JWT y autoriza por rol.
- controllers: coordina la entrada HTTP y la lógica del negocio.
- services: accede a Firestore y realiza las operaciones CRUD.
- models: encapsula la estructura de los datos y los esquemas de validación.
- config: inicializa Firebase según entorno local o producción.

## Configuración e instalación

### Requisitos

- Node.js 18 o superior.
- npm.
- Un proyecto de Firebase con Firestore habilitado.

### Instalación

```bash
git clone https://github.com/Benchav/Payless-Api.git
cd Payless-Api
npm install
```

## Variables de entorno

En la raíz del proyecto crea un archivo .env con estas variables:

```env
JWT_SECRET=tu_clave_secreta
JWT_EXPIRES_IN=2h

FIREBASE_PROJECT_ID=tu_project_id
FIREBASE_CLIENT_EMAIL=tu_service_account_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

CORS_ORIGIN=http://localhost:3000,https://tu-dominio-vercel.app
NODE_ENV=development
```

### Notas sobre Firebase

- En desarrollo, el proyecto intenta cargar un archivo local serviceAccountKey.json si existe.
- En producción, usa las variables FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL y FIREBASE_PRIVATE_KEY.
- La clave privada debe conservar los saltos de línea con \n dentro del archivo .env.

## Scripts disponibles

- npm run dev: ejecuta la API en modo desarrollo con nodemon.
- npm start: ejecuta la API con node.
- npm run build: script de placeholder, no realiza compilación.
- npm test: script de placeholder, no ejecuta pruebas.

## Ejecución local

### Modo desarrollo

```bash
npm run dev
```

### Modo producción local

```bash
npm start
```

### Rutas locales

- API: http://localhost:3000
- Swagger: http://localhost:3000/api-docs

## Despliegue en Vercel

El proyecto usa src/index.js como punto de entrada para Vercel y vercel.json para la configuración de rutas.

### Pasos generales

1. Sube el proyecto al repositorio.
2. Configura las variables de entorno en Vercel.
3. Despliega el proyecto.
4. Verifica que la ruta raíz responda correctamente.

### Archivo de configuración

- vercel.json define el build con @vercel/node.
- Todas las rutas se redirigen a src/index.js.
- Se incluyen encabezados CORS básicos para las respuestas.

## Autenticación y autorización

### Registro

POST /auth/register

Permite crear usuarios con username, password y role.

### Inicio de sesión

POST /auth/login

Devuelve un token JWT, el rol del usuario y la información básica del usuario.

### Roles soportados

- managua
- jinotepe
- chontales
- masaya
- granada
- admin

### Reglas de acceso

- El middleware auth.middleware.js valida el token JWT enviado en el encabezado Authorization.
- El middleware authorize.middleware.js restringe el acceso según el rol.
- Los roles managua y admin tienen acceso especial a las rutas protegidas.
- Las rutas de autenticación tienen limitación de intentos para evitar abuso.

## Endpoints principales

### Autenticación

- POST /auth/register: registra un usuario nuevo.
- POST /auth/login: autentica un usuario y genera un token.

### Inventario por ciudad

- GET /api/managua: obtiene el inventario agregado de Jinotepe, Chontales, Masaya y Granada.
- GET /api/jinotepe: lista zapatos de Jinotepe.
- POST /api/jinotepe: crea un zapato en Jinotepe.
- PUT /api/jinotepe/:id: actualiza un zapato de Jinotepe.
- DELETE /api/jinotepe/:id: elimina un zapato de Jinotepe.
- GET /api/chontales: lista zapatos de Chontales.
- POST /api/chontales: crea un zapato en Chontales.
- PUT /api/chontales/:id: actualiza un zapato de Chontales.
- DELETE /api/chontales/:id: elimina un zapato de Chontales.
- GET /api/masaya: lista zapatos de Masaya.
- POST /api/masaya: crea un zapato en Masaya.
- PUT /api/masaya/:id: actualiza un zapato de Masaya.
- DELETE /api/masaya/:id: elimina un zapato de Masaya.
- GET /api/granada: lista zapatos de Granada.
- POST /api/granada: crea un zapato en Granada.
- PUT /api/granada/:id: actualiza un zapato de Granada.
- DELETE /api/granada/:id: elimina un zapato de Granada.

### Documentación

- GET /api-docs: interfaz Swagger para probar los endpoints.

## Estructura de datos

### Zapato

Campos principales:

- id: identificador único.
- name: nombre del zapato.
- brand: marca. Por defecto, Payless.
- size: talla.
- price: precio.
- stock: inventario disponible.
- createdAt: fecha de creación.

### Usuario

Campos principales:

- id: identificador único.
- username: nombre de usuario.
- passwordHash: contraseña cifrada.
- role: rol asignado.
- createdAt: fecha de creación.

## Validación de datos

El proyecto usa Joi para validar los cuerpos de las peticiones.

### Validaciones de usuario

- username obligatorio entre 3 y 50 caracteres para registro.
- password obligatorio con mínimo de 6 caracteres.
- role obligatorio y limitado a los valores soportados.

### Validaciones de zapato

- name obligatorio.
- brand opcional.
- size obligatorio y dentro del rango definido.
- price y stock opcionales con valores por defecto.
- Las actualizaciones requieren al menos un campo válido.

## Seguridad

- Helmet para cabeceras de seguridad.
- Compression para comprimir respuestas.
- CORS configurado desde variables de entorno.
- Rate limiting para rutas de autenticación y para la API en general.
- JWT para proteger las rutas privadas.
- Contraseñas almacenadas con hash usando bcryptjs.

## Swagger

La documentación OpenAPI se genera desde los comentarios de las rutas y se expone en /api-docs.

Swagger incluye:

- Schemas de Shoe y NewShoe.
- Seguridad por bearer token.
- Descripción de rutas de autenticación e inventario.

## Archivos importantes

- src/app.js: configuración principal de la API.
- src/server.js: arranque local del servidor.
- src/index.js: exportación para Vercel.
- src/config/firebase.js: conexión con Firebase.
- src/routes/auth.routes.js: rutas de autenticación.
- src/routes/locations.routes.js: rutas de inventario por ciudad.
- src/middleware/auth.middleware.js: validación de JWT.
- src/middleware/authorize.middleware.js: control de permisos.
- src/middleware/validate.body.js: validación de esquemas.
- src/models/shoe.schema.js: esquemas Joi para zapatos.
- src/models/user.schema.js: esquemas Joi para usuarios.
- src/controllers/*: controladores por módulo.
- src/services/*: acceso a datos por módulo.

## Observaciones del proyecto

- El proyecto no incluye pruebas automatizadas reales.
- El script build es solo un placeholder.
- La API depende de Firestore para guardar usuarios y zapatos.
- El archivo .env no debe subirse al repositorio.

## Uso rápido

1. Instala dependencias con npm install.
2. Configura el archivo .env.
3. Ejecuta npm run dev.
4. Abre http://localhost:3000/api-docs.
5. Registra un usuario y obtén un token JWT.
6. Usa el token en Authorization para consumir las rutas protegidas.

## Soporte de despliegue

Si cambias el dominio de producción, actualiza:

- CORS_ORIGIN en las variables de entorno.
- SERVER_URL si deseas que Swagger apunte al dominio correcto.

## Licencia

Proyecto privado o de uso interno, salvo que se indique lo contrario por el propietario.