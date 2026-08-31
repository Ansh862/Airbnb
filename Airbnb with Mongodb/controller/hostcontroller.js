const Home = require('../models/home');
const User = require('../models/user')
const fs = require('fs');

//host request
exports.getAddHome = (req,res,next)=>{
  res.render('host/edit-home',{pageTitle :'Add Home',currentPage:'Add Home',editing:false,isLoggedIn:req.isLoggedIn,userType:req.userType})
}

// post home
exports.postAddHome = (req,res,next)=>{
// console.log('Home Registration successfull for :',req.body,req.body.houseName);

const {houseName, price,location, rating,description} = req.body;
const photo = req.file.path;
const hostId = req.session.user._id;

const home = new Home(houseName, price,location, rating, photo,description,hostId);
// const home = new Home(req.body.houseName, req.body.price, req.body.rating, req.body.photo, req.body.description,req.body.location,req.session.user._id);
console.log(req.file)

if(!req.file){
  return res.status(422).redirect('/host/add-home');
}

if(houseName==""|| price=="" || rating=="" || description==""|| location=="" || photo==""){ 
  res.render('host/edit-home',{pageTitle :'Add Home',currentPage:'Add Home',editing:false,isLoggedIn:req.isLoggedIn,userType:req.userType})
}else{
  home.save().then(async()=>{  
  await User.saveHostHomes(hostId).then(()=>{
  console.log('Home Saved Successfully');
  res.render('host/home-added',{pageTitle :'Home Added successfully',currentPage:'Home Added',isLoggedIn:req.isLoggedIn,userType:req.userType});
})} 
)}
}

// get host homes
exports.getHostHomes = (req,res,next)=>{
  const userId =req.session.user._id
  User.fetchHostHomes(userId).then(registeredHomes=>{
  res.render('host/host-home-list',{registeredHomes,pageTitle :'Host Homes list',currentPage:'Host Homes',isLoggedIn:req.isLoggedIn,userType:req.userType})
  })
};


exports.getEditHome = (req,res,next)=>{
  const homeId = req.params.homeId;
  const editing = req.query.editing==='true';
  // value passed in url was string to convert it into boolian we compare them
  Home.findById(homeId).then(home=>{
    if(!home){
      console.log('home not found for editiing');
      return res.redirect('/host/host-home-list');
    }else{
      res.render('host/edit-home',{home:home,pageTitle :'Edit your Homes',currentPage:'Host Homes',editing:editing,isLoggedIn:req.isLoggedIn,userType:req.userType});
    }
  })}


exports.postEditHome = (req,res,next)=>{
 const {houseName, price,location, rating,description,id} = req.body;
 Home.findById(id).then(edithome=>{
   if(houseName==""|| price=="" || rating=="" || description==""|| location==""){
     res.render('host/edit-home',{home:edithome,pageTitle :'Edit your Homes',currentPage:'Host Homes',editing:true,isLoggedIn:req.isLoggedIn,userType:req.userType})
    }
    else{   
   const home = {
    houseName : houseName,
    price : price,
    location : location,
    rating : rating,
    description : description
 }
  if(req.file){
    fs.unlink(edithome.photo,(err)=>{
      if(err){
        console.log('error while deleting file',err)
      }
    })
    home.photo = req.file.path;
  };
 Home.update_Save(home,id).then(result=>{
   User.updateGuestFav(home,id).then(()=>{
     console.log('home updated',result);
     res.redirect('/host/host-home-list');
    })
  })}
 })
}

exports.postDeleteHome=(req,res,next)=>{
  const homeId = req.params.homeId;
  Home.deleteById(homeId).then(()=>{
    User.deleteAllFavs(homeId).then(()=>{
      res.redirect('/host/host-home-list');
    })
  }).catch(err=>{
    console.log('error while deleting',err)
  })
}

