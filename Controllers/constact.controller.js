const constact = require('../Models/constact.model');

exports.getConstact = (req,res,next)=>{
    res.render('contact',{
      pageTitle: 'constact'  
    })
}

exports.postConstact = (req,res,next)=>{
   
}