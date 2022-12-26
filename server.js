const express = require('express')
const app = express();
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const jwt =  require("jsonwebtoken")

const api=require('./routes/index')

const port = process.env.PORT || 3000

//Connecting Database
connectDB();


// app.use(express.json())
// app.use(express.urlencoded({extended: false}))
// app.set("view engine", "ejs")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api',api);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.post("/forgot-password",(req,res,next)=>{
//   const {email} = req.body
// })

// app.get("/rest-password",(req,res,next)=>{
  
// })

// app.post("/rest-password",(req,res,next)=>{
  
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})