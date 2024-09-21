const express = require('express');
const EnvLoader = require('./src/config/environment');
const { connectDB } = require('./src/config/db');
const registerRoutes = require('./src/routes/registerRoutes'); 
const verifyDataRoutes = require('./src/routes/verifyDataRoutes'); 
const loadDataRoutes = require('./src/routes/loadDataRoutes'); 
const verifyDocument = require('./src/routes/verifyDocumentRoutes'); 
const uploadDocument = require('./src/routes/uploadDocumentRoutes'); 
const userRoute = require('./src/routes/userRoute'); 


const envLoader = new EnvLoader(); 

const app = express();
app.use(express.json());

const PORT = envLoader.get('PORT') || 3000;
//  allow access on origins
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();
});
// Conectar a la base de datos
connectDB().then(() => {
  // Definir las rutas
  app.use('/api/registers', registerRoutes);
  app.use('/api/verifyData', verifyDataRoutes); 
  app.use('/api/load', loadDataRoutes); 
  app.use('/api/verifyDocument', verifyDocument); 
  app.use('/api/uploadDocument', uploadDocument); 
  app.use('/api/users', userRoute); 

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});