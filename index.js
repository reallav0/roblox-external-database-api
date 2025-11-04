const crypto = require('crypto');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;

const uri = process.env.MONGODB;
const cluster = new MongoClient(uri);

async function increaseQuantity(id) {
    const db = cluster.db('petCounters');
    const pet = db.collection('petCounts');
    const result = await pet.findOneAndUpdate(
        { id },
        { $inc: { quantity: 1 } },
        { upsert: true, returnDocument: 'after' }
    );
    return result.quantity;
}


async function decreaseQuantity(id) {
    const db = cluster.db('petCounters');
    const pet = db.collection('petCounts');
    const found = await pet.findOne({ id });
    const newQuantity = Math.max((found.quantity || 1) - 1, 0);
    await pet.updateOne({ id }, { $set: { quantity: newQuantity } });
    return newQuantity;
}

async function getQuantity(id) {
    const db = cluster.db('petCounters');
    const pet = db.collection('petCounts');
    const found = await pet.findOne({ id });
    if (!found) {
        return 0;
    }
    return found.quantity;
}



app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});


app.post('/api/counter/inc', async (req, res) => {
    const { id } = req.body;
    if (typeof id !== 'number') {
        console.log(`[${new Date().toISOString()}] [INC API] Notification: Invalid or missing pet id.`);
        return res.status(400).json({ result: false, message: 'Invalid or missing pet id.' });
    }
    try {
        const quantity = await increaseQuantity(id);
        console.log(`[${new Date().toISOString()}] [INC API] Notification: Quantity for id ${id} is now ${quantity}`);
        return res.json({ result: true, quantity });

    } catch (err) {
        console.error(`[${new Date().toISOString()}] [INC API] Error:`, err);
        return res.status(500).json({ result: false, message: 'Server error.' });
    }
});


app.post('/api/counter/dec', async (req, res) => {
    const { id } = req.body;
    if (typeof id !== 'number') {
        console.log(`[${new Date().toISOString()}] [DEC API] Notification: Invalid or missing pet id.`);
        return res.status(400).json({ result: false, message: 'Invalid or missing pet id.' });
    }
    try {
        const quantity = await decreaseQuantity(id);
        console.log(`[${new Date().toISOString()}] [DEC API] Notification: Quantity for id ${id} is now ${quantity}`);
        return res.json({ result: true, quantity });
    } catch (err) {
        console.error(`[${new Date().toISOString()}] [DEC API] Error:`, err);
        return res.status(500).json({ result: false, message: 'Server error.' });
    }
});


app.post('/api/counter/get', async (req, res) => {
    const { id } = req.body;
    if (typeof id !== 'number') {
        console.log(`[${new Date().toISOString()}] [GET API] Notification: Invalid or missing pet id.`);
        return res.status(400).send('0');
    }
    try {
        const quantity = await getQuantity(id);
        console.log(`[${new Date().toISOString()}] [GET API] Notification: Quantity for id ${id} is ${quantity}`);
        return res.send(quantity.toString());
    } catch (err) {
        console.error(`[${new Date().toISOString()}] [GET API] Error:`, err);
        return res.status(500).send('0');
    }
});