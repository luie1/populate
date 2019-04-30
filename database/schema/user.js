const mongoose=require('../connect');
const Schema=mongoose.Schema;

const user={
  nombre:String,
  password:String,
  email:String,
  comentario:[
    Schema.Types.ObjectId
  ]
};

const usermodel=mongoose.model('user',user);

module.exports=usermodel;
