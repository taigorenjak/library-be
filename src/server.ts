import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;
const SECRET_KEY = 'tajni-kljuc'; // Zamenjaj s svojim ključem

// Razširitev Express Request tipa za user objekt
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

app.use(bodyParser.json());

// Registracija uporabnika
app.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    // Tukaj bi običajno shranili uporabnika v bazo
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
});

// Prijava uporabnika
app.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    // Tukaj bi preverili ustreznost gesla
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
});

// Middleware za preverjanje JWT tokena
const preveriToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.sendStatus(401); // Nepooblaščen dostop
    return;
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      res.sendStatus(403); // Prepovedan dostop
      return;
    }
    req.user = user;
    next();
  });
};

// Zaščitena pot
app.get('/zaščiteno', preveriToken, (req: Request, res: Response) => {
  res.json({ sporočilo: 'To so zaščiteni podatki', uporabnik: req.user });
});

// Obdelava napak
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Napaka:', err);
  res.status(500).json({ napaka: 'Prišlo je do napake na strežniku' });
});

// Zagon strežnika
app.listen(PORT, () => {
  console.log(`Strežnik teče na http://localhost:${PORT}`);
});