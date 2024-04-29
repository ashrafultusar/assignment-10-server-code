const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// https://art-and-craft-authentaction.web.app
// https://art-and-craft-authentaction.firebaseapp.com

// https://art-and-craft-store-server-ioz1o3buw.vercel.app
// http://localhost:5173


// midelware
app.use(cors({ origin: ["http://localhost:5173","https://art-and-craft-authentaction.web.app","https://art-and-craft-authentaction.firebaseapp.com"]}));
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_password}@cluster0.hzcboi3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri);

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
    // await client.connect();

    const craftCollection = client.db("craftDB").collection("craft");
    
    const allCategories = client.db("craftDB").collection("categories");

// all catagories
    app.get("/categories", async (req, res) => {
      const cursor = allCategories.find();
      const result = await cursor.toArray();
      res.send(result);
})



    // all clint add craft
    app.get("/craft", async (req, res) => {
      const cursor = craftCollection.find();
      result = await cursor.toArray();
      res.send(result);
    });

    app.post("/craft", async (req, res) => {
      const newCraft = req.body;
      console.log(newCraft);

      const result = await craftCollection.insertOne(newCraft);
      res.send(result);
    });

    // my add craft
    app.get("/myArt/:email", async (req, res) => {
      console.log("console hobe", req.params.email);
      const result = await craftCollection
        .find({ id: req.params.email })
        .toArray();
      res.send(result);
    });

    // update cruft------------
    app.get("/updatecraft/:id", async (req, res) => {
      console.log(req.params.id);
      const result = await craftCollection.findOne({
        _id: new ObjectId(req.params.id),
      });
      console.log(result);
      res.send(result);
    });

    app.put("/updateCraft/:id", async (req, res) => {
      console.log(req.params.id);
      const query = { _id: new ObjectId(req.params.id) };
      const data = {
        $set: {
          photo: req.body.photo,
          subcategoryName: req.body.subcategoryName,
          shortDescription: req.body.shortDescription,

          price: req.body.price,
          rating: req.body.rating,

          customization: req.body.customization,
          processingTime: req.body.processingTime,

          stockStatus: req.body.stockStatus,
        },
      };
      const result= await craftCollection.updateOne(query,data)
      console.log(result);
      res.send(result);

    });
    // update code end---------
    

    // delet medthod------
    app.delete("/delete/:id",async (req, res) => {
      const result = await craftCollection.deleteOne({ _id: new ObjectId(req.params.id) })
      console.log(result);
res.send(result)
      
})

    
    app.get('/updateCraft/:id',async (req, res) => {
      const resul = await craftCollection.findOne({ _id: new ObjectId(req.params.id) })
      console.log(resul)
      res.send(resul)
    })
    

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
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
