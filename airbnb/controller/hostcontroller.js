const Home = require('../models/home');
const favHome = require('../models/fav');

//host request
exports.getAddHome = (req,res,next)=>{
  res.render('host/edit-home',{pageTitle :'Add Home',currentPage:'Add Home',editing:false})
}

exports.postAddHome = (req,res,next)=>{
console.log('Home Registration successfull for :',req.body,req.body.houseName);

const {id,houseName, price, rating, photourl} = req.body;
const home = new Home(id,houseName, price, rating, photourl);
// const home = new Home(req.body.houseName, req.body.price, req.body.rating, req.body.photourl);
if(houseName==""|| price=="" || rating=="" || photourl==""){ res.render('host/edit-home',{pageTitle :'Add Home',currentPage:'Add Home',editing:false})}
else{home.save();
res.render('host/home-added',{pageTitle :'Home Added successfully',currentPage:'Home Added'})
}
}

exports.getHostHomes = (req,res,next)=>{
  const registeredHomes = Home.fetchAll(
    (registeredHomes)=>{
  // console.log(registeredHomes);
  res.render('host/host-home-list',{registeredHomes,pageTitle :'Host Homes list',currentPage:'Host Homes'})
});
}

exports.getEditHome = (req,res,next)=>{
  const homeId = req.params.homeId;
  const editing = req.query.editing==='true';
  // value passed in url was string to convert it into boolian we compare them
  Home.findById(homeId,home=>{
    console.log(homeId,editing);
    if(!home){
      console.log('home not found for editiing');
      return res.redirect('/host/host-home-list');
    }
    res.render('host/edit-home',{home:home,pageTitle :'Edit your Homes',currentPage:'Host Homes',editing:editing});
  })
}

exports.postEditHome = (req,res,next)=>{
 const {id,houseName, price, rating, photourl} = req.body;
 const home = new Home(id,houseName, price, rating, photourl);
 console.log(home);
 home.save();
 res.redirect('/host/host-home-list');
}

exports.postDeleteHome=(req,res,next)=>{

  const homeId = req.params.homeId;
  console.log("y rhi id ",homeId)
  Home.deleteById(homeId,()=>{
    console.log("ho gya delete..khus ab")
    favHome.deleteById(homeId,()=>{
      console.log("ho gya delete..khus ab")
    })
  })
  res.redirect('/host/host-home-list');
}
