const password="MmDQTmblKvaOjiFY";
var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://demoUser:MmDQTmblKvaOjiFY@cluster0.grxft.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.json());
app.use(cors());
client.connect(err => {
  const productCollection = client.db("emaJhonStore").collection("products");
  const ordersCollection = client.db("emaJhonStore").collection("orders");
  // perform actions on the collection object
          app.post('/addProduct',(req,res)=>{
            const products = req.body;
            console.log(products);
            productCollection.insertOne(products)
            .then(result=>{
                //console.log(result.insertedCount);
                console.log(result);
                res.send(result.insertedCount>0);
            });
        })
console.log('databaseconnected');

          app.get('/products',(req,res)=>{
            productCollection.find({}).toArray((err,document)=>{
                res.send(document);
            })
          })

          app.get('/product/:key',(req,res)=>{
            productCollection.find({key:req.params.key}).toArray((err,documents)=>{
              res.send(documents[0]);
            })
          })

          app.post('/productByKeys',(req,res)=>{
            const productkeys = req.body;
            productCollection.find({key:{$in: productkeys}}).toArray((err,documents)=>{
              res.send(documents);
            })
          })

          app.post('/addOrders',(req,res)=>{
            const orders = req.body;
            //console.log(orders);
            ordersCollection.insertOne(orders)
            .then(result=>{
                //console.log(result.insertedCount);
                console.log(result.insertedCount);
                res.send(result.insertedCount > 0);
            });

          })

});



app.listen(5000);