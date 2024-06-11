import express , { Request , Response} from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', (req: Request, res: Response) => {
  // Check if the user's credentials are valid
  const user = { id: 1, username: 'admin', password: '1234' }; // Example user object
  const isValid = req.body.username === user.username && req.body.password === user.password;

  if (isValid) {
    // Generate a JWT token with a payload containing the user ID and username
    const token = jwt.sign({ id: user.id, username: user.username }, 'secret', { expiresIn: '24h' });

    // Send the token as a response to the user
    res.json({ token });
  } else {
    // If the user's credentials are invalid, send a 401 Unauthorized response
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

export default router;