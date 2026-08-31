exports.error404 = (req,res,next)=>{
  res.status(404).render('404', { pageTitle: 'Page Not Found' , currentPage:'404' });
}

exports.error500 =(req, res, next) => {
  res.status(500).render('error', { 
    message: 'Something went wrong!' 
  });
};