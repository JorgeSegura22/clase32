const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const port = 3000;
const indexRouter = require('./routes/index');

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para parsear datos del formulario
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Configurar el manejo de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal
app.use('/', indexRouter);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
