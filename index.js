const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.grxft.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const port = 5000;
require('dotenv').config();
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.json());
app.use(cors());
client.connect(err => {
  const productCollection = client.db("emaJhonStore").collection("products");
  // perform actions on the collection object

    //Create
  app.post('/addProduct',(req,res)=>{
      const products = req.body;
      console.log(products);
      productCollection.insertMany(products)
      .then(result=>{
          console.log(result.insertedCount);
          res.send(result.insertedCount);
      })
  })
  console.log('Database connected');
  //get
  app.get('/products',(req,res)=>{
      productCollection.find({}).limit(20).toArray((err,document)=>{
          res.send(document);
      })
  })

});
app.listen(port);