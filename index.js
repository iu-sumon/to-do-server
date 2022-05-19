const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;



require('dotenv').config()
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tcnyx.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const taskCollection = client.db('user').collection('task');

        //...........................CREATE........................//
        app.post('/tasks', async (req, res) => {
            const newTask = req.body;
            const result = await taskCollection.insertOne(newTask);
            res.send(result)
        })



        //...........................READ.........................//
        app.get('/tasks', async (req, res) => {
            const query = {};
            const cursor = taskCollection.find(query);
            const tasks = await cursor.toArray();
            res.send(tasks);
        })

        //............................DELETE......................//

        app.delete('/taskDetails/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await taskCollection.deleteOne(query);
            res.send(result)

        })

     }
    finally {

    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Running todo')
})

app.listen(port, () => {
    console.log('Listening to the port', port);
})