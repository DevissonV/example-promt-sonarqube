import express, { Request, Response } from 'express';

export function createServer() {
  const app = express();

  //  Error intencional: uso de tipo `any` (S4325)
  app.get('/hello', (req: Request, res: Response): any => {
    //  Error intencional: catch genérico (S2221)
    try {
      const name = req.query.name || 'World';
      res.json({ message: `Hello, ${name}!` });
    } catch (error: any) {
      res.status(500).json({ error: 'Unexpected error occurred' });
    }
  });

  return app;
}