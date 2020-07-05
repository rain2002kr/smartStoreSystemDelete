const express = require('express');
const server = express();
const mongoose = require('mongoose')
//프로미스 중첩에 빠지지 않도록 도와줌
mongoose.Promise = global.Promise;
let User = require('./models/users');
const bodyParser = require('body-parser');
//const dotenv = require('dotenv')
require('dotenv').config({path:'variable.env'})
const PORT = 5000;


server.use(bodyParser.json());

server.get('/', (req,res)=>{
    User.find()
    .then((result)=>{console.log(result); res.json(result);})
    .catch((err)=>{console.log('error'); console.log(err)})
})    

server.post('/api/user',(req,res)=>{
    let newUser = new User();
        newUser.email = req.body.email;
        newUser.name = req.body.name;
        newUser.age = Number(req.body.age);
    newUser.save()
    .then((user)=>{console.log(user); res.json({ message :"user Created Successfully"})})
    .catch((err)=>{console.log(err); res.json({message : "user was not Created Successfully"})})
})


server.get('/api/user/:id',(req,res)=>{
   User.find({name : req.params.id}
    .then((result)=>{res.json(result)})
    .catch((err)=>{console.log(err)}))

})

server.put('/api/user/:id',(req,res)=>{
  User.findOneAndUpdate(
    {name : req.params.id},{name : req.body.name, email : req.body.email, age : req.body.age}
    .then((result)=>{res.json(result)})
    .catch((err)=>{console.log(err)}))

})

server.delete('/api/user/:id',(req,res)=>{
   User.findOneAndRemove(
    {name : req.params.id}.then((result)=>{res.json(result)}).catch((err)=>{console.log(err)}))


})

function connectDB() {
    let db
    mongoose.connect('mongodb://localhost/test',{useNewUrlParser: true})
    db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', function() {
        // we're connected!
        console.log("Connect to database sucessfully")
    });
        
}

server.listen(PORT, (err)=>{
    if(err) console.log(err); 
    else 
    console.log("express server is running on port %s",PORT)
    connectDB();
})
