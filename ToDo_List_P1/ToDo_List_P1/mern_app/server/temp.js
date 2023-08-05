const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5500;

app.use(cors());
app.use(bodyParser.json());

// Replace 'your_mongodb_uri' with your actual MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://sanjaysmnb:sanjay123@cluster0.q51pj3l.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("db connected")
})

const itemSchema = new mongoose.Schema({
  item: String,
  description: String,
});

const Item = mongoose.model('Item', itemSchema);

app.post('/api/item', async (req, res) => {
  try {
    const { item, description } = req.body;
    const newItem = await Item.create({ item, description });
    res.json(newItem);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to create the item.' });
  }
});

app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to get the items.' });
  }
});

app.delete('/api/item/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Item.findByIdAndDelete(id);
    res.json({ message: 'Item deleted successfully.' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to delete the item.' });
  }
});

app.put('/api/item/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { item, description } = req.body;
    const updatedItem = await Item.findByIdAndUpdate(id, { item, description }, { new: true });
    res.json(updatedItem);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to update the item.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
