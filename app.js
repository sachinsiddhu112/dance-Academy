const express=require("express");
const path=require("path");
const fs=require("fs");
const mongoose=require("mongoose");

const dotenv = require('dotenv');
dotenv.config();
const Mongo_Url = process.env.MONGO_URL;

 const mongodb= async()=>{
    await mongoose.connect(Mongo_Url,
    
    console.log("connected")
   );

}

const app=express();
const port=process.env.port || 3000;

//mongoose stuff
const contactSchema=new mongoose.Schema({
       name:String,
     phone:String,
    email:String,
   address:String,
   desc:String
});
 
var Contact=mongoose.model('Contact',contactSchema);
mongoose.set('bufferCommands', false);
mongodb();
//EXPRESS SPECIFIC STUFFnod
//app.use(express.static('static',option));//
app.use('static',express.static('static'));//THIS IS FOR SERVING STATIC FILE.
app.use(express.urlencoded({extended: false}));//THIS IS FOR OBTAIN DATA FILLED IN FORM


//PUG SPECIFIC STUFF
app.set('view engine','pug')//set the template engine
app.set('views',path.join(__dirname,'views'))//set the views directory

//END POINSTS
app.get('/',(req,res)=>{
    const params={};
    res.status(200).render('home.pug',params);})
 app.get('/info',(req,res)=>{
    const params={};
    res.status(200).render('info.pug',params);})
    
app.get('/contact',(req,res)=>{
    const params={};
    res.status(200).render('contact.pug',params);
})
app.get("/class",(req,res)=>{
    res.status(200).render('class.pug')
});



app.post('/contact',async (req,res)=>{
    let user=await Contact.create({
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email,
        address:req.body.address,
        desc:req.body.desc
    })
    // var myData=new Contact(req.body);
    // myData.save().then(()=>{
        res.status(200).render('submit.pug');

    // }).catch(()=>{
    //     res.status(400).send("the item is not saved in data base");
    // })
    
})


//START THE SERVER
app.listen(port,()=>{
    console.log("the application started successfully");
})