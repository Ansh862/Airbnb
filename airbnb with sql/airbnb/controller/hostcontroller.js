const Home = require('../models/home');
const favHome = require('../models/fav');

//host request
exports.getAddHome = (req,res,next)=>{
  res.render('host/edit-home',{pageTitle :'Add Home',currentPage:'Add Home',editing:false})
}

exports.postAddHome = (req,res,next)=>{
// console.log('Home Registration successfull for :',req.body,req.body.houseName);

const {houseName, price,location, rating, photourl,description} = req.body;
const home = new Home(houseName, price,location, rating, photourl,description);
// const home = new Home(req.body.houseName, req.body.price, req.body.rating, req.body.photourl);
if(houseName==""|| price=="" || rating=="" || photourl==""){ res.render('host/edit-home',{pageTitle :'Add Home',currentPage:'Add Home',editing:false})}
else{home.save();
res.render('host/home-added',{pageTitle :'Home Added successfully',currentPage:'Home Added'})
}
}

exports.getHostHomes = (req,res,next)=>{
  Home.fetchAll().then(([registeredHomes,fields])=>{
  res.render('host/host-home-list',{registeredHomes,pageTitle :'Host Homes list',currentPage:'Host Homes'})
  })
};


exports.getEditHome = (req,res,next)=>{
  const homeId = req.params.homeId;
  const editing = req.query.editing==='true';
  // value passed in url was string to convert it into boolian we compare them
  Home.findById(homeId).then(([homes,field])=>{
    const home = homes[0];
    if(!home){
      console.log('home not found for editiing');
      return res.redirect('/host/host-home-list');
    }else{
      res.render('host/edit-home',{home:home,pageTitle :'Edit your Homes',currentPage:'Host Homes',editing:editing});
    }
  })}


exports.postEditHome = (req,res,next)=>{
 const {id,houseName, price,location, rating, photourl,description} = req.body;
 const home = new Home(houseName, price,location, rating, photourl,description,id);
 console.log(home);
 home.save();
 res.redirect('/host/host-home-list');
}

exports.postDeleteHome=(req,res,next)=>{
  const homeId = req.params.homeId;
  Home.deleteById(homeId).then(()=>{
    res.redirect('/host/host-home-list');
  }).catch(err=>{
    console.log('error while deleting',err)
  })
}
