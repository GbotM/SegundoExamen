const express = require('express');
const cors = require('cors');

const app = express();

// Habilitar CORS y lectura de JSON
app.use(cors());
app.use(express.json());

const LITROS_POR_GALON = 3.785;

// Endpoint POST para realizar el cálculo
app.post('/api/calcular-leche', (req, res) => {
    try {
        const { L, PG } = req.body;

        if (L === undefined || PG === undefined || typeof L !== 'number' || typeof PG !== 'number') {
            return res.status(400).json({ 
                error: 'Se requieren las variables L (litros) y PG (precio del galón) como valores numéricos.' 
            });
        }

        const TG = L / LITROS_POR_GALON;
        const GA = TG * PG;

        return res.json({
            mensaje: 'Cálculo realizado con éxito',
            resultado: {
                L: L,
                PG: PG,
                TG: parseFloat(TG.toFixed(4)),
                GA: parseFloat(GA.toFixed(2))
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error interno en el servidor' });
    }
});

// Ruta raíz para verificar que el servicio está activo
app.get('/', (req, res) => {
    res.json({ estado: 'API de Conversión de Leche funcionando correctamente 🚀' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});