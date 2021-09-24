import express from "express";
import { home } from "../controller/controller.js";

const rootRouter = express.Router();

rootRouter.get("/", home);

// rootRouter.get("/comment", getPosting)

export default rootRouter;
