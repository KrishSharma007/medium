import { Hono } from "hono";
import medium from "./routes/userRouter";
import blog from "./routes/blogrouter";
import { cors } from "hono/cors";

const app = new Hono();
app.use("*", cors());
app.route("/api/v1/user", medium);
app.route("/api/v1/blog", blog);
export default app;
