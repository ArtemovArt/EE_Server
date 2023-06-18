import Router from "express";
import PostController from "./cardController.js";
import authMiddleware from "./middleware/auth.middleware.js";

const router = new Router();

router.post("/cards", PostController.create);
router.get("/cards", PostController.getAll);
router.get("/cards/:id", PostController.getOne);
router.put("/cards", PostController.update);
// router.delete("/cards/:id", PostController.delete);
router.delete("/dictionary/:id", authMiddleware, PostController.delete);
router.post("/dictionary", authMiddleware, PostController.addToDict);
router.get("/dictionary", authMiddleware, PostController.getAllDict);

export default router;
