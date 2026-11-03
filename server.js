import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = (process.env.PORT && process.env.PORT !== '8080') ? process.env.PORT : 3000;

// Health check endpoint for PaaS / Coolify / Nixpacks / pxxl.space
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Serve compiled static files
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`AWS re:Invent Kwara server running on http://0.0.0.0:${PORT}`);
});
