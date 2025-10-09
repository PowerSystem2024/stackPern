import { pool } from "../db.js";

export const listTareas =  async (req, res) => {
    const resultado = await pool.query("SELECT * FROM tareas");
    return res.json(resultado.rows);
}

export const listTarea = async(req, res) => {
    const resultado = await pool.query("SELECT * FROM tareas WHERE id = $1", [req.params.id]);
    if (resultado.rows.length === 0) {
        return res.status(404).json({
    message: "Tarea no encontrada"
});
 }
    return res.json(resultado.rows[0]);
}

export const crearTarea = async (req, res, next) => {
    const { titulo, descripcion } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO tareas (titulo, descripcion) VALUES ($1, $2) RETURNING *',
            [titulo, descripcion]
        );
        console.log(result);
        res.json(result.rows[0]);
    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({ message: 'La tarea ya existe' });
        }
        console.log(error);
        next(error);
    }
};


export const actualizarTarea = async (req, res) => {
    const { titulo, descripcion } = req.body;
    const id = req.params.id;
    const resultado = pool.query("UPDATE tareas SET titulo = $1, descripcion = $2 WHERE id = $3 RETURNING *", [titulo, descripcion, id]);

    if (resultado.rowCount === 0) {
        return res.status(404).json({
            message: "No existe una tarea con ese id"
        });
}
return res.json(result.rows[0]);
}


export const eliminarTarea = (req, res) => {
    const resultado = pool.query("DELETE FROM tareas WHERE id = $1", [req.params.id]);
    console.log(resultado);

    if (resultado.rowCount === 0) {
        return res.status(404).json({
            message: "No existe una tarea con ese id"
        });
    }

 return res.sendStatus(204);
}