const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const sprintRoutes = require('./routes/sprintRoutes');
const productBacklogRoutes = require('./routes/productBacklogRoutes');
const cors = require('cors');
dotenv.config();//The CORS mechanism supports secure cross-origin requests and data transfers between browsers and servers.

if (!process.env.MONGO_URI) {
  console.error('Error: MONGO_URI environment variable is not set.');
  process.exit(1);
} else {
  console.log('MONGO_URI is set.');
}

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/projects/:projectId/sprints', sprintRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the Scrum Tool API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
