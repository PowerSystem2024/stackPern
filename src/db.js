import pg from "pg";

export const pool = new pg.Pool({
    port: 5432,
    host: "localhost",
    user: "postgres",
    password: "admin",
    database: "test_bd",
});

pool.on("connect", () => {
    console.log("Conectado a la base de datos");
});

pool.on("error", (err) => {
    console.error("Error en la conexión a la base de datos:", err.message);
});