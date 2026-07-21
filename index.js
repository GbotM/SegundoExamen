app.post('/api/calcular-leche', (req, res) => {
    try {
        const { L, PG } = req.body;

        // Validar que lleguen los datos
        if (L === undefined || PG === undefined || typeof L !== 'number' || typeof PG !== 'number') {
            return res.status(400).json({ 
                error: 'Se requieren las variables L (litros) y PG (precio del galón) como números.' 
            });
        }

        const LITROS_POR_GALON = 3.785;
        const TG = L / LITROS_POR_GALON;
        const GA = TG * PG;

        // Responder obligatoriamente con .json()
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