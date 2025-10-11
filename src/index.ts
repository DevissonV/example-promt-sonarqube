import { createServer } from './server';

const port = process.env.PORT || 3000;

// Error intencional: variable sin uso (S1481)
const version = '1.0.0';

const app = createServer();

app.listen(port, () => {
  // Error intencional: uso de console.log directo (S106)
  console.log(`Server running on http://localhost:${port}`);
});