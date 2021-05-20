const express= require('express');
const router= express.Router();
const modelCategory=require('../models/table_categories');
const modelMovies=require('../models/table_movies');

router.get('/index',async(req,res)=>{
        const movies=await modelMovies.find().populate('category',{category:1});
        const categories=await modelCategory.find();
        res.render('index/movies',{categories,movies});
});
router.post('/add_movies',async(req,res)=>{
    const movies=new modelMovies(req.body);
    await movies.save();
    res.redirect('/index');
   
});
router.get('/delete/:id',async(req,res)=>{
    const {id}=req.params;
    await modelMovies.remove({_id:id});
    res.redirect('/index');
});

router.get('/edit/:id',async(req,res)=>{
    const {id}=req.params;
    const movies=await modelMovies.findById(id).populate('category',{category:1});
    const categories=await modelCategory.find();
    res.render('index/editMovie',{movies,categories});
    
});

router.post('/edit/:id',async(req,res)=>{
    const {id}=req.params;
    await modelMovies.updateOne({_id:id},req.body);
    res.redirect('/index');
   
});



module.exports=router;