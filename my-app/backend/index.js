const express = require('express');
const Wallmessage = require('./models/wallmessage');
const sequelize = require('./sequelize');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/wallmessages', async (req, res) => {
  try {
    const messages = await Wallmessage.findAll();
    res.json(messages);
  } catch (error) {
    console.error('Error fetching wall messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

app.post('/wallmessages', async (req, res) => {
    try {
      const { text } = req.body;       
      const newMessage = await Wallmessage.create({ text });
      res.status(201).json(newMessage);
    } catch (error) {      
      res.status(500).json({ error: 'Failed to create message' });
    }
  });

async function initializeServer() {
  try {    
    await syncDatabase();  
    startServer();
  } catch (error) {
    console.error('Failed to sync database or start server:', error);
  }
}

async function syncDatabase() {
  await sequelize.sync({ alter: true });
  console.log('Database synchronized.');
}

function startServer() {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}


initializeServer();