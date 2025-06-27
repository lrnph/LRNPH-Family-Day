import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors'
import { initializeDatabases } from './db';
import { getEmployee } from './controllers/employee-controller';
import { createRegistration } from './controllers/registration-controller';
import { swaggerUI } from '@hono/swagger-ui';
import { apiDocs } from './docs/api-docs';


const app = new Hono();

initializeDatabases()

app.use('*', cors({
  origin: [ "http://localhost:5173"],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))

app.get("/docs", (c) => c.json(apiDocs));
app.get('/ui', swaggerUI({ url: '/docs' }))

// Employee Route
app.get('/employee/:id', getEmployee);

// Claim Route
app.post('/register', createRegistration);

serve(app, (info) => {
  console.log(`Listening on http://localhost:${info.port}`);
});