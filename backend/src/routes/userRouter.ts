import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { signinInput, signupInput } from "../zod";
// import bcrypt from "bcrypt";
const medium = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();
const saltRounds = 10;
// Authentication routes
medium.post("/signup", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();

    const { success } = signupInput.safeParse(body);
    if (!success) {
      return c.json({ error: "Wrong input" }, 411);
    }

    // const hpassword= await bcrypt.hash(body.password,saltRounds)
    const response = await prisma.user.create({
      data: {
        email: body.email.toLowerCase(),
        username: body.username.toLowerCase(),
        name: body.name,
        password: body.password,
        // password:hpassword,
      },
    });
    const token = await sign(
      {
        username: body.username,
        id: response.id,
      },
      c.env.JWT_SECRET
    );
    return c.json({ token: token, username: body.username }, 200);
  } catch (error) {
    console.error("Error creating user:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

medium.post("/signin", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success) {
      return c.json({ error: "Wrong input" }, 411);
    }
    const user = await prisma.user.findUnique({
      where: {
        username: body.username.toLowerCase(),
      },
    });
    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }
    // if (!(await bcrypt.compare(body.password,user.password))) {
    if (body.password !== user.password) {
      return c.json({ error: "Wrong password" }, 401);
    }
    const token = await sign(
      {
        username: body.username.toLowerCase(),
        id: user.id,
      },
      c.env.JWT_SECRET
    );
    return c.json({ token: token, username: body.username }, 200);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

medium.get("/me", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasources: {
        db: { url: c.env.DATABASE_URL },
      },
    }).$extends(withAccelerate());

    const header = c.req.header("Authorization") || "";
    const token = header.split(" ")[1];

    if (!token) {
      return c.json({ message: "Authorization token missing" }, 401);
    }

    const decoded = (await verify(token, c.env.JWT_SECRET)) as {
      username: string;
      id: string;
    };

    if (!decoded || !decoded.id) {
      return c.json({ message: "Invalid token" }, 401);
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return c.json({ logged: false, message: "User not found" }, 404);
    }

    return c.json({ logged: true });
  } catch (error: any) {
    console.error(error);
    return c.json({ logged: false, message: "Error occurred" }, 500);
  }
});

export default medium;
