import express from "express";
import {
  postComment,
  patchComment,
  deleteComment,
  readAllComment,
} from "../controller/controller.js";

const apiRouter = express.Router();

apiRouter.get("/comment", readAllComment);
apiRouter.post("/comment", postComment);
apiRouter.patch("/comment/:id", patchComment);
apiRouter.delete("/comment/:id", deleteComment);
export default apiRouter;
