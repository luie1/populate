const User=require('../../database/schema/user');
const Comentario=require('../../database/schema/comentario');
const sha1=require('sha1');

const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    User.find({},(err,docs)=>{
      Comentario.populate(docs,{path:'comentario'},(err,result)=>{
        res.status(200).json(result);
      });
    });
});

router.post('/',async(req,res)=>{
    let datos=req.body;
    datos['password']=sha1(datos['password']);
    let ins=new User(datos);
    let result=await ins.save();
    res.status(200).json({
      message:'usuario insertado'
    });
});

router.patch('/:id',async(req,res)=>{
    let id=req.params.id;
    let comentario=req.body;
    let ins=new Comentario(comentario);
    let result=await ins.save();

    User.find({_id:id}).exec((err,doc)=>{
        let datos=doc[0];
        datos['comentario'].push(result['_id']);
        User.findByIdAndUpdate({_id:id},datos,(err,re)=>{
          res.status(200).json({
            message:'el usuario realizo un comentario'
          });
        });
    });

});

module.exports=router;
