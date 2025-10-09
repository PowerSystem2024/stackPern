import Router from "express-promise-router";

import { actualizarTarea, crearTarea, eliminarTarea, listTarea, listTareas } from "../controllers/tareas.controller.js";
import { isAuth } from "../middlewares/auth.middlewares.js";

const router = Router();

router.get("/tareas", isAuth ,listTareas);

router.get("/tareas/:id", listTarea);

router.post("/tareas", crearTarea);

router.put("/tareas/:id", actualizarTarea);

router.delete("/tareas/:id", eliminarTarea);

export default router;