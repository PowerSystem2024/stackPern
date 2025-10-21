import Router from "express-promise-router";

import { actualizarTarea, crearTarea, eliminarTarea, listTarea, listTareas } from "../controllers/tareas.controller.js";
import { isAuth } from "../middlewares/auth.middlewares.js";

const router = Router();

router.get("/tareas", isAuth ,listTareas);

router.get("/tareas/:id",isAuth, listTarea);

router.post("/tareas",isAuth, crearTarea);

router.put("/tareas/:id",isAuth, actualizarTarea);

router.delete("/tareas/:id",isAuth, eliminarTarea);

export default router;