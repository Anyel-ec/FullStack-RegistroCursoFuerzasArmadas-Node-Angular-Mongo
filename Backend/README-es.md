# Backend API for Register and Verify Data System

## Descripción

Este proyecto es una API backend que gestiona el registro de usuarios, la verificación de datos, la carga de documentos y el envío de notificaciones por correo electrónico. La API interactúa con una base de datos MongoDB y permite realizar operaciones CRUD sobre colecciones como `registers`, `verifyData`, `uploadDocument`, y más.

## Tecnologías

- **Node.js**: Entorno de ejecución del servidor.
- **Express.js**: Framework para la creación del servidor web.
- **MongoDB**: Base de datos NoSQL.
- **Multer**: Middleware para la gestión de archivos.
- **Nodemailer**: Envío de correos electrónicos.
- **dotenv**: Manejo de variables de entorno.
- **Joi**: Validación de datos.

## Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/Anyel-ec/FullStack-ProcesoRegistroCursoFuerzasArmadas-NodeJS-Angular18-MongoDB
    ```

2. Instala las dependencias:

    ```bash
    cd FullStack-ProcesoRegistroCursoFuerzasArmadas-NodeJS-Angular18-MongoDB
    npm install
    ```

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

    ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/your_db
    EMAIL_USER=tu_correo@gmail.com
    EMAIL_PASS=tu_contraseña
    ```

4. Inicia el servidor:

    ```bash
    npm start
    ```

El servidor se ejecutará en `http://localhost:3000`.

## Endpoints

### Registro de Usuarios

- **GET /api/registers**: Obtiene todos los registros.
- **GET /api/registers/:id**: Obtiene un registro por su ID.
- **POST /api/registers**: Crea un nuevo registro.
- **PUT /api/registers/:id**: Actualiza un registro por su ID.
- **DELETE /api/registers/:id**: Elimina un registro.

### Verificación de Datos

- **GET /api/verifyData**: Obtiene todos los datos de verificación.
- **GET /api/verifyData/:id**: Obtiene los datos de verificación por ID.
- **POST /api/verifyData**: Crea nuevos datos de verificación.
- **PUT /api/verifyData/:id**: Actualiza los datos de verificación por ID.
- **DELETE /api/verifyData/:id**: Elimina los datos de verificación.

### Carga de Documentos

- **POST /api/uploadDocument/:id**: Carga un documento asociado a un registro de verificación.
- **PUT /api/uploadDocument/:id**: Actualiza un documento existente.
- **GET /api/uploadDocument/:id**: Obtiene un documento por ID.

### Usuarios

- **GET /api/users**: Obtiene todos los usuarios.
- **POST /api/users**: Crea un nuevo usuario.

## Estructura del Proyecto

```
├── src
│   ├── config
│   │   ├── db.js             # Configuración de conexión a MongoDB
│   │   ├── environment.js    # Carga de variables de entorno
│   ├── routes
│   │   ├── registerRoutes.js # Rutas relacionadas a registros
│   │   ├── verifyDataRoutes.js
│   │   ├── uploadDocumentRoutes.js
│   ├── collections
│   │   ├── Register.js       # Modelo de registros
│   │   ├── VerifyData.js     # Modelo de datos de verificación
│   └── services
│       └── emailService.js   # Servicio para envío de correos electrónicos
├── .env                      # Variables de entorno
├── server.js                 # Archivo principal para iniciar el servidor
```

## Validaciones

El sistema valida las entradas de los usuarios, incluyendo:
- **Cédula de Ecuador** válida.
- **Número de teléfono** (debe empezar con 0 y tener 10 dígitos).
- **Correo electrónico** válido.
- El **nombre** debe tener entre 3 y 100 caracteres.
- Debe ser mayor de 18 años.