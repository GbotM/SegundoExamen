const express = require('express');
const cors = require('cors');

const app = express();

// Habilitar CORS y lectura de JSON
app.use(cors());
app.use(express.json());

// Constante de conversión proporcionada (1 galón = 3.785 litros)
const LITROS_POR_GALON = 3.785;

// Endpoint POST para realizar el cálculo según la lógica del problema
app.post('/api/calcular-leche', (req, res) => {
    const { L, PG } = req.body;

    // Validar que se envíen los datos requeridos y sean numéricos
    if (L === undefined || PG === undefined || typeof L !== 'number' || typeof PG !== 'number') {
        return res.status(400).json({ 
            error: 'Se requieren las variables L (litros) y PG (precio del galón) como valores numéricos.' 
        });
    }

    // Lógica del algoritmo:
    // TG = Cantidad de galones que produce
    const TG = L / LITROS_POR_GALON;

    // GA = Ganancia por la entrega de leche
    const GA = TG * PG;

    // Respuesta con las variables de la tabla 2.8
    res.json({
        mensaje: 'Cálculo realizado con éxito',
        resultado: {
            L: L,
            PG: PG,
            TG: parseFloat(TG.toFixed(4)), // Cantidad de galones
            GA: parseFloat(GA.toFixed(2))  // Ganancia total
        }
    });
});

// Ruta de prueba raíz
app.get('/', (req, res) => {
    res.send('API de Conversión de Leche funcionando correctamente 🚀');
});

// Configuración del puerto asignado por Render o por defecto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});