const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

const app = express();
const port = 3000; // Cambiado a 3000 para evitar conflictos con MySQL

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexión a la base de datos
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'ionic'
});

// Conectar a la base de datos
db.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conectado a la base de datos');
});

// Ruta para registrar un usuario
app.post('/registro', [
    body('nombre_completo').notEmpty().withMessage('El nombre completo es obligatorio'),
    body('nombre_usuario').notEmpty().withMessage('El nombre de usuario es obligatorio'),
    body('rut_completo').notEmpty().withMessage('El RUT es obligatorio'),
    body('correo').isEmail().withMessage('El correo debe ser un email válido'),
    body('contraseña').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
], async (req, res) => {
    // Validación de datos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nombre_completo, nombre_usuario, rut_completo, correo, contraseña } = req.body;

    // Comprobar si el RUT, correo o nombre de usuario ya existen
    const checkQuery = 'SELECT * FROM usuarios WHERE rut_completo = ? OR correo = ? OR nombre_usuario = ?';
    db.query(checkQuery, [rut_completo, correo, nombre_usuario], async (err, results) => {
        if (err) {
            console.error('Error al comprobar el usuario: ', err);
            return res.status(500).json({ message: 'Error en la comprobación de datos' });
        }

        // Si ya existe un usuario con el RUT, correo o nombre de usuario
        if (results.length > 0) {
            let errorMessage = 'Datos duplicados: ';
            let hasError = false;

            if (results.some(user => user.rut_completo === rut_completo)) {
                errorMessage += 'El RUT ya está registrado. ';
                hasError = true;
            }
            if (results.some(user => user.correo === correo)) {
                errorMessage += 'El correo ya está registrado. ';
                hasError = true;
            }
            if (results.some(user => user.nombre_usuario === nombre_usuario)) {
                errorMessage += 'El nombre de usuario ya está registrado. ';
                hasError = true;
            }

            // Retorna error 409 para conflictos de duplicados
            return res.status(409).json({ message: errorMessage.trim() });
        }

        try {
            // Cifrar la contraseña
            const hashedPassword = await bcrypt.hash(contraseña, 10);

            // Insertar nuevo usuario
            const insertQuery = 'INSERT INTO usuarios (nombre_completo, nombre_usuario, rut_completo, correo, contraseña) VALUES (?, ?, ?, ?, ?)';
            db.query(insertQuery, [nombre_completo, nombre_usuario, rut_completo, correo, hashedPassword], (err, result) => {
                if (err) {
                    console.error('Error al registrar el usuario: ', err);
                    return res.status(500).json({ message: 'Error al registrar el usuario' });
                }
                res.status(201).json({ message: 'Usuario registrado exitosamente' });
            });
        } catch (hashErr) {
            console.error('Error al cifrar la contraseña:', hashErr);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    });
});

// Ruta para login
app.post('/ingreso', [
    body('nombre_usuario').notEmpty().withMessage('El nombre de usuario es obligatorio'), // Validar el nombre de usuario
    body('contraseña').notEmpty().withMessage('La contraseña es obligatoria')
], async (req, res) => {
    const { nombre_usuario, contraseña } = req.body;

    // Validación de datos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Buscar al usuario por nombre de usuario
    const query = 'SELECT * FROM usuarios WHERE nombre_usuario = ?'; // Buscar por nombre de usuario
    db.query(query, [nombre_usuario], async (err, results) => {
        if (err) {
            console.error('Error al buscar el usuario:', err);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        const user = results[0];

        // Comparar la contraseña cifrada
        const isMatch = await bcrypt.compare(contraseña, user.contraseña);
        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Si la contraseña coincide, devolver éxito
        res.status(200).json({ message: 'Ingreso exitoso', user });
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
