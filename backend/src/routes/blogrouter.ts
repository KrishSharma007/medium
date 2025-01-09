import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

const blog = new Hono<{
  Bindings:{
    DATABASE_URL :string,
    JWT_SECRET:string
  }
}>()
blog.use('/*',async (c,next)=>{
    try {
      const header = c.req.header("Authorization") || '';
      const token = header.split(' ')[1];
      if (!token) {
        return c.json({ message: 'Authorization token missing' }, 401);
      }
      const decoded = await verify(token, c.env.JWT_SECRET);
      if (!decoded || !decoded.id) {
        return c.json({ message: 'Invalid token' }, 401);
      }
      c.set("jwtPayload", decoded.id);
      await next();
    } catch (error:any) {
      return c.json({ message: 'Not Authorized', error: error.message }, 401);
    }
  });
// Blog routes
blog.post('/', async (c) => {
  try {
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
    const body = await c.req.json();
    const userId = c.get("jwtPayload"); 
    if (!userId) {
      return c.json({ message: "Unauthorized. Please log in first." }, 401);
    }
    await prisma.post.create({
      data: {
        content: body.content,
        authorId: userId,
        title: body.title,
      }
    });

    return c.text('Blog post created successfully!');
  } catch (error:any) {
    console.error('Error while creating blog post:', error);
    return c.json({ message: "An error occurred while creating the blog post.", error: error.message }, 400);
  }
});
blog.get('/bulk', async (c) => {
  try {
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
    const results = await prisma.post.findMany();

    if (results.length === 0) {
      return c.json({ message: "No blogs found" }, 200);
    }
    return c.json({ results }, 200);
  } catch (error:any) {
    console.error('Error fetching posts:', error);
    return c.json({ message: "Internal server error", error: error.message }, 500);
  }
});
blog.get('/:id', async (c) => {
  try {
    const id = await c.req.param('id');
    if (!id) {
      return c.json({ message: "Blog ID is required" }, 400);
    }

    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
    const blog = await prisma.post.findFirst({
      where: { id: Number(id) },
    });

    if (!blog) {
      return c.json({ message: "Blog not found" }, 404);
    }

    return c.json(blog, 200);
  } catch (error: any) {
    console.error('Error fetching blog:', error);
    return c.json({ message: error.message }, 500);
  }
});
blog.put('/', async (c) => {
  try {
    const body = await c.req.json();
    if (!body.id || !body.title || !body.content) {
      return c.json({ message: "Blog ID, title, and content are required" }, 400);
    }

    const userId = c.get("jwtPayload");
    if (!userId) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());

    const blog = await prisma.post.update({
      where: {
        id: body.id,
        authorId: userId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return c.json({ message: "Blog updated successfully", blog }, 200);
  } catch (error: any) {
    return c.json({ message: error.message }, 500);
  }
});

export default blog;