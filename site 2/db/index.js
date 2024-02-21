const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://rishitkamboj24:ilovesis@cluster0.hlpepga.mongodb.net/HomeBizz')


const customer = new mongoose.Schema({
  
     name:String,  
       email:String,
     p_no:Number,
     pass:String
 });


 const check=new mongoose.Schema({
    firstName:String,
    lastName:String,
    userName:String,
    email:String,
    add1:String,
    add2:String,
    country:String,
    state:String,
    zip:Number,
 })


const productSchema = new mongoose.Schema({
    p_id:Number,
    p_name:String,
    p_price:Number,
    p_desc:String,
    img:String
});

const order=new mongoose.Schema({
    p_name:String,
    p_price:Number,
    p_desc:String,
    img:String,
    p_id:Number,
    quantity:Number
});

// Create a model based on the schema
const Product = mongoose.model('Product', productSchema);

 const User = mongoose.model('usercus', customer);
 const Order=mongoose.model('orders',order);
 const checkin=mongoose.model('checkout',check);

 module.exports={
     User,Product,Order,checkin
 }
 