exports.logout = (req,res,next) =>{
    req.session.destroy(()=>{
        res.redirect('/signin');       
    })
}