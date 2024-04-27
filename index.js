const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// midelware
app.use(cors());
app.use(express.json());



const uri =
  `mongodb+srv://${process.env.DB_user}:${process.env.DB_password}@cluster0.hzcboi3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri)

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      
      app.post('/craft', async (req, res) => {
          const newCraft = req.body;
          console.log(newCraft)
})





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get("/", (req, res) => {
  res.send("ARET & CRAFT SERVER IS RUNNING");
});

app.listen(port, () => {
  console.log(`ARET & CRAFT SERVER IS RUNNING: ${port}`);
});

app.get("/");
