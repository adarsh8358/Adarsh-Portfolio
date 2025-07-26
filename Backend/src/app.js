import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import contactRoutes from './routes/contact.routes.js';

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://portfolio-adarsh.onrender.com', // ✅ CORRECT
  ],
}));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use('/users', userRoutes);
app.use('/api/contact', contactRoutes);








export default app;