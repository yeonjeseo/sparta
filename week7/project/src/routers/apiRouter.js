import express from "express";
import { postComment, patchComment } from "../controller/controller.js";

const apiRouter = express.Router();

apiRouter.post("/comment", postComment);
apiRouter.patch("/comment/:id", patchComment);
export default apiRouter;
