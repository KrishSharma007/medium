import { Hono } from "hono";
import medium from "./routes/userRouter";
import blog from "./routes/blogrouter";

const app = new Hono();
app.route('/api/v1/user', medium);
app.route('/api/v1/blog', blog);
export default app;