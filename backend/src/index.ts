import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate())

const medium = new Hono();

// Authentication routes
medium.post('/signup', (c) => {
  return c.text('Signup endpoint');
});

medium.post('/signin', (c) => {
  return c.text('Signin endpoint');
});

// Blog routes
medium.post('/blog', (c) => {
  return c.text('Create a blog');
});

medium.get('/blog/:id', (c) => {
  const id=c.req.param('id')
  return c.text('List all blogs');
});

medium.put('/blog/:id', (c) => {
  const id=c.req.param('id')
  return c.text('Update a blog');
});

// Main application
const app = new Hono();
app.route('/api/v1', medium);

export default app;
