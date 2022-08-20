
exports.getAbout = (req,res,next) =>{
    res.render('about',{
        pageTitle : 'About',
        userId: req.session.userId,
        firstname: req.session.firstname,
        lastname: req.session.lastname,
        date_naissance: req.session.date_naissance,
        photo: req.session.photo
    });
}