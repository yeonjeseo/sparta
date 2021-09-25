import express from "express";
import { home, getComment, getDetail } from "../controller/controller.js";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/comment", getComment);
rootRouter.get("/comment/:id", getDetail);

// rootRouter.get("/comment", getPosting)

export default rootRouter;
