import { Hono } from "hono";
import commandController from "./command.controller";

const app = new Hono();
app.route("/", commandController);

export default app;
