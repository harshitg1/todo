import express from 'express';
import morgan from 'morgan';  
import taskRoutes from './routes/taskRoutes';  
import { connectDB } from './config/db';  
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000; 
 // Allow dynamic port assignment
 app.use(express.json());

 app.use(cors({
  origin: '*'
 }));

 app.use(morgan(':method :url :status'));

// Use the imported routes
app.use('/api/task', taskRoutes);

// Handle 404 errors
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Connect to the database and start the server
const startServer = async () => {
  try {
    await connectDB();  // Establish a database connection
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database", error);
    process.exit(1);
  }
};

// Start the server
startServer();
