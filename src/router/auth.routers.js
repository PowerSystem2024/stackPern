import Router from "express-promise-router";
import { signin, signup, signout, profile } from "../controllers/auth.controller.js";
import { isAuth } from "../middlewares/auth.middlewares.js";

const router = Router();

router.post("/signin", signin);
router.post("/login", signin);

router.post("/signup", signup);
router.post("/register", signup);

router.post("/signout", signout);

router.get("/profile",isAuth, profile);
router.get("/perfil",isAuth, profile);

export default router;

