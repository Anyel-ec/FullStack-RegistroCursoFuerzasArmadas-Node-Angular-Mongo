# Backend NodeJS Express MongoDB

Este es un proyecto de backend para un sistema avanzado de programación, utilizando Node.js, Express y MongoDB. El proyecto incluye diversas rutas y controladores para manejar registros de usuarios, autenticación, carga de documentos y verificación de datos.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Configuración](#configuración)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Rutas](#rutas)
- [Ejemplos de Uso](#ejemplos-de-uso)
- [Contribución](#contribución)
- [Licencia](#licencia)

## Instalación

1. Clonar el repositorio:

    ```sh
    git clone https://github.com/Anyel-ec/Backend-NodeJS-RestAPI-Advanced-Programming.git
    cd Backend-NodeJS-RestAPI-Advanced-Programming
    ```

2. Instalar las dependencias:

    ```sh
    npm install
    ```

3. Crear un archivo `.env` en la raíz del proyecto con la siguiente configuración:

    ```env
    PORT=3000
    MONGO_URI=your_mongodb_uri
    SECRET_KEY=your_secret_key
    ```

## Configuración

El proyecto utiliza un cargador de variables de entorno personalizado y se conecta a una base de datos MongoDB. Asegúrate de configurar correctamente tu archivo `.env` con las variables necesarias.

## Estructura del Proyecto

```
├── src
│   ├── config
│   │   ├── db.js
│   │   └── environment.js
│   ├── controller
│   │   ├── loadDataController.js
│   │   ├── registerController.js
│   │   ├── sendEmailController.js
│   │   ├── uploadDocumentController.js
│   │   ├── userController.js
│   │   ├── verifyDataController.js
│   │   └── verifyDocumentsController.js
│   ├── middleware
│   │   └── registerMiddleware.js
│   ├── routes
│   │   ├── registerRoutes.js
│   │   ├── verifyDataRoutes.js
│   │   ├── loadDataRoutes.js
│   │   ├── verifyDocumentRoutes.js
│   │   ├── uploadDocumentRoutes.js
│   │   └── userRoute.js
│   └── utils
│       └── validateEcuadorianID.js
├── .env
├── package.json
└── index.js
```

## Rutas

### Registro de Usuarios

- `GET /api/registers` - Obtener todos los registros
- `GET /api/registers/:id` - Obtener un registro por ID
- `GET /api/registers/identification/:identification` - Obtener un registro por identificación
- `POST /api/registers` - Crear o actualizar un registro
- `PUT /api/registers/:id` - Actualizar un registro por ID
- `PUT /api/registers/identification/:identification` - Actualizar un registro por identificación
- `DELETE /api/registers/:id` - Eliminar un registro

### Autenticación de Usuarios

- `POST /api/users/register` - Crear un nuevo usuario
- `POST /api/users/login` - Autenticar un usuario

### Verificación de Datos

- `GET /api/verifyData` - Obtener todos los registros de verificación
- `GET /api/verifyData/relations` - Obtener registros de verificación con datos relacionados
- `PUT /api/verifyData/:id` - Actualizar un registro de verificación
- `DELETE /api/verifyData/:id` - Eliminar un registro de verificación

### Carga de Documentos

- `PUT /api/uploadDocument/:id` - Actualizar la verificación de un documento

### Otros Endpoints

- `GET /api/load/gender` - Obtener géneros
- `GET /api/load/province` - Obtener provincias
- `GET /api/load/command` - Obtener tipos de comandos

## Ejemplos de Uso

### Encriptación y Desencriptación

En el frontend, los datos se encriptan utilizando `CryptoJS` antes de ser enviados al servidor:

```javascript
import CryptoJS from 'crypto-js';

const secretKey = 'my-secret-key';
const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();
```

En el backend, los datos se desencriptan utilizando la misma clave secreta:

```javascript
const CryptoJS = require('crypto-js');

const secretKey = process.env.SECRET_KEY;

function decrypt(encryptedData) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}

// Ejemplo de desencriptación en una ruta
app.post('/login', (req, res) => {
    const encryptedUser = req.body.user;
    const encryptedPassword = req.body.password;

    const user = decrypt(encryptedUser);
    const password = decrypt(encryptedPassword);

    console.log('Decrypted User:', user);
    console.log('Decrypted Password:', password);

    // Lógica de autenticación...
});
```

## Contribución

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Sube tu rama (`git push origin feature/nueva-funcionalidad`).
5. Crea un Pull Request.

## Licencia

Este proyecto está licenciado bajo la Licencia ISC. Consulta el archivo `LICENSE` para más detalles.
