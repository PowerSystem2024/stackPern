import { Router } from "express";
import { actualizarTarea, crearTarea, eliminarTarea, listTarea, listTareas } from "../controllers/tareas.controller.js";

const router = Router();

router.get("/tareas", listTareas);

router.get("/tareas/:id", listTarea);

router.post("/tareas", crearTarea);

router.put("/tareas/:id", actualizarTarea);

router.delete("/tareas/:id", eliminarTarea);

export default router;