import express from "express";
import { postComment } from "../controller/controller.js";

const apiRouter = express.Router();

apiRouter.post("/comment", postComment);

export default apiRouter;
