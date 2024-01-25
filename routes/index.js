// routes/index.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Define el array de validaciones
const validaciones = [
  body('nombre').notEmpty().withMessage('El nombre es requerido'),
  body('color').notEmpty().withMessage('El color es requerido'),
  body('email').isEmail().withMessage('Ingrese un email válido'),
  body('edad').optional().isNumeric().withMessage('La edad debe ser un número')
];


router.get('/', (req, res) => {
    const backgroundColor = req.cookies.colorDePreferencia;
  res.render('index', { errors: null,successMessage:null,backgroundColor});
});


router.post('/submit', validaciones, (req, res) => {
    const errores = validationResult(req);
    errores

    if (!errores.isEmpty()) {
      
      res.render('index', { errors: errores.mapped(),successMessage:"",backgroundColor:null });
    } else {
       
       
      const { nombre, color, email, edad } = req.body;
      backgroundColor = color;
      recordarColor=req.body.recordarColor
      if (recordarColor === 'on') {
        res.cookie('colorDePreferencia', color, { maxAge: 30 * 24 * 60 * 60 * 1000 }); // Cookie válida por 30 días
      }

     
        
          
      res.render('agradecimiento', {
        successMessage: `Hola ${nombre}, elegiste el color: ${color}, tu email es: ${email} y tu edad es: ${edad}`,
        errors: null,backgroundColor, nombre 
      });
    }
});


router.post("/reset",(req, res) => {
    req.body.olvidarColor
    console.log(req.body.olvidarColor)
    
        console.log("llegue ")
      // Limpiar la cookie
      res.clearCookie('colorDePreferencia');
   
  res.render('index', { errors: null,successMessage:null,backgroundColor:null});
});

module.exports = router;



