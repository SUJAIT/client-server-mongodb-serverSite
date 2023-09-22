const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

// middleware start
app.use(cors());
app.use(express.json());
// middleware end


// Mongodb Code start


const uri = "mongodb+srv://mdsujait2004:rvqUf99HoyM5rYVN@cluster0.edybvhy.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //Database insert a data start
     const database = client.db("usersDB");
    const userCollaction = database.collection("users");
    //Database insert a data end

//MongoDb To Data gat start
app.get('/users',async(req,res)=>{
  const cursor =userCollaction.find()
  const result = await cursor.toArray();
  res.send(result);
})
//MongoDb To Data gat End

// DB Data Update data callected Start
app.get('/users/:id', async(req,res) =>{
  const id =req.params.id;
  const query = {_id: new ObjectId(id)}
  const user =await userCollaction.findOne(query);
  res.send(user);
})
// DB Data Update data callected End

//Db Data Update Start
app.put('/users/:id', async(req,res) =>{
  const id = req.params.id;
  const user = req.body;
  console.log(user);
  const filter = {_id: new ObjectId(id)}
  const options = {upsert: true}
  const updatedUser = {
    $set : {
      name: user.name,
      email:user.email
    }
  }
  const result = await userCollaction.updateOne(filter,updatedUser,options);
  res.send(result);

})
//Db Data Update End


//start post
app.post('/users',async(req,res)=>{
    const user =req.body;
    console.log('new user',user);

     // Insert the defined document into the "userCollaction" collection
    const result = await userCollaction.insertOne(user);
    res.send(result);
});
//End post

//Db to data delate start
app.delete('/users/:id', async(req,res)=>{
  const id =req.params.id;//params is data value neai
  console.log('Please delete from database',id);
  const query ={_id: new ObjectId(id)}
  const result = await userCollaction.deleteOne(query);
  res.send(result)
})
//Db to data delate End



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// Mongodb Code End



app.get('/',(req,res)=>{
 res.send('ai bata conected')
});


app.listen(port,()=>{
    console.log(`listen port ${port}`)
})
