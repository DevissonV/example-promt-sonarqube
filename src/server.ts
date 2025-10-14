import express, { Request, Response } from 'express';

export function createServer() {
  const app = express();

  app.get('/hello', (req: Request, res: Response): any => {
    //  codigo corregido
    try {
      const name = typeof req.query.name === 'string' ? req.query.name : 'World';
      res.json({ message: `Hello, ${name}` });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Unexpected error occurred' });
      }
    }
  });

  return app;
}