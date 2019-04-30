const mongoose=require('../connect');

const coment={
    comentario:String
};

const comentariomodel=mongoose.model('coment',coment);

module.exports=comentariomodel;
