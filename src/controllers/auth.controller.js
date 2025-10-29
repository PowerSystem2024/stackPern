import { pool } from "../db.js";
import bcrypt from "bcrypt";
import { createAccessToken } from "../libs/jwt.js";
import md5 from "md5"; 

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Correo y contraseña son obligatorios" });
        }

        const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email])

        if(result.rowCount === 0){
            return res.status(400).json({message: "El correo no esta registrado"});
        }

        const validPassword = await bcrypt.compare(password, result.rows[0].password);

        if(!validPassword){
            return res.status(400).json({message: "Contraseña incorrecta"});
        }

        const token = await createAccessToken({ id: result.rows[0].id });
        console.log(result);

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            maxAge: 60 * 60 * 24 * 1000 // 1 day
        });

        const { password: pwd, ...user } = result.rows[0];
        return res.json({ user, token });
    } catch (error) {
        console.error("Error en signin:", error);
        return res.status(500).json({ message: error.message });
    }
}

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const gravatar = "https://www.gravatar.com/avatar/" + md5(email);

        console.log(hashedPassword);

        const result = await pool.query(
            "INSERT INTO usuarios (name, email, password, gravatar) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, email, hashedPassword, gravatar]
        );

        const token = await createAccessToken({ id: result.rows[0].id });
        console.log(result);

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            maxAge: 60 * 60 * 24 * 1000 // 1 day
        });

        const { password: pwd, ...user } = result.rows[0];
        return res.json({ user, token });
    } catch (error) {
        console.error("Error en signup:", error);
        if (error.code === "23505") {
            return res.status(400).json({ message: "El correo ya esta registrado" });
        }
        return res.status(500).json({ message: error.message });
    }
};

export const signout = (req, res) => {
    res.clearCookie("token");
    return res.json({ message: "Sesión cerrada" });
 }
export const profile = async (req, res) => {
    const result = await pool.query("SELECT * FROM usuarios WHERE id = $1", [req.usuarioId]);
    return res.json(result.rows[0]);
}
