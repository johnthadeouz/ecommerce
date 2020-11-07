module.exports.pageNotFound = (request,response,next)=>{
    response.status(404).render('page-not-found',{docTitle:'Page Not Found',path:''});
};