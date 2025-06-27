import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors'
import { createBooth, getBooth, updateBooth } from './controllers/booth-controller';
import { getAnalytics, getChart } from './controllers/dashboard-controller';
import { exportToExcel } from './controllers/export-controller';
import { initializeDatabases } from './database/db';
import { swaggerUI } from '@hono/swagger-ui';
import { apiDocs } from './docs/api-docs';

const app = new Hono();

initializeDatabases()

app.use('*', cors({
  origin: ["http://localhost:5174", "http://localhost:5173"],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))

app.get("/docs", (c) => c.json(apiDocs));
app.get('/ui', swaggerUI({ url: '/docs' }))


// Booth Route
app.get('/booth', getBooth);
app.post('/booth', createBooth)
app.put('/booth', updateBooth)

// Dashboard Route
app.get('/dashboard', getChart)
app.post('/dashboard', getAnalytics)
// Exporting data to Excel
app.get('/export', exportToExcel)


serve(app, (info) => {
  console.log(`Listening on http://localhost:${info.port}`);
});