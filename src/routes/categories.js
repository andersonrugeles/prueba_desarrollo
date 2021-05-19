const express= require('express');
const router= express.Router();
const modelCategory=require('../models/table_categories');

router.get('/categories',async(req,res)=>{
    const categories=await modelCategory.find();
    res.render('index/categories',{categories});
});

router.post('/add_categories',async(req,res)=>{
const categorie=new modelCategory(req.body);
await categorie.save();
res.redirect('/categories');
});

router.get('/deleteCategory/:id',async(req,res)=>{
    const {id}=req.params;
    await modelCategory.remove({_id:id});
    res.redirect('/categories');
});

router.get('/editCategory/:id',async(req,res)=>{
    const {id}=req.params;
    const categories=await modelCategory.findById(id);
    res.render('index/editCategory',{categories}); 
   
});

router.post('/editCategory/:id',async(req,res)=>{
    const {id}=req.params;
    await modelCategory.updateOne({_id:id},req.body);
    res.redirect('/categories');
   
});




module.exports=router;