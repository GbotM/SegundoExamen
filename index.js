const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Habilitar CORS y lectura de JSON
app.use(cors());
app.use(express.json());

// Servir archivos estáticos (HTML, CSS, JS del frontend) desde la misma carpeta del proyecto
app.use(express.static(path.join(__dirname)));

const LITROS_POR_GALON = 3.785;

// Endpoint POST para realizar el cálculo
app.post('/api/calcular-leche', (req, res) => {
    const { L, PG } = req.body;

    if (L === undefined || PG === undefined || typeof L !== 'number' || typeof PG !== 'number') {
        return res.status(400).json({ 
            error: 'Se requieren las variables L (litros) y PG (precio del galón) como valores numéricos.' 
        });
    }

    const TG = L / LITROS_POR_GALON;
    const GA = TG * PG;

    res.json({
        mensaje: 'Cálculo realizado con éxito',
        resultado: {
            L: L,
            PG: PG,
            TG: parseFloat(TG.toFixed(4)),
            GA: parseFloat(GA.toFixed(2))
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});