const Home = require('../models/home');
const favHome = require('../models/fav');

//user request
exports.getbookings=(req,res,next)=>{
  console.log("welcome to bookings section")
  res.render('store/booking',{pageTitle :'Booked Homes',currentPage:'Bookings'})
}

exports.getIndex=(req,res,next)=>{
  Home.fetchAll().then(([registeredHomes,fields])=>{
    console.log("welcome to Index section")
    res.render('store/Index',{registeredHomes:registeredHomes,pageTitle :'airbnb Homes',currentPage:'Index'})
  })
}


exports.getHomes = (req,res,next)=>{
  Home.fetchAll().then(([registeredHomes,fields])=>{
    console.log("welcome to Home section")
      res.render('store/home-list',{registeredHomes,pageTitle :'Homes list',currentPage:'Home'})
    });
  }
    
    exports.getHomeDetails = (req,res,next)=>{
      const homeId = req.params.homeId;
      Home.findById(homeId).then(([homes])=>{
        const home = homes[0];
        console.log(home);
        if(!home){
          console.log("home not fouund");
          res.redirect("/homes")
        }else{
          console.log("home Details Found ",home);
          res.render('store/home-detail',{home : home,pageTitle :'Homes Detail',currentPage:'Home'})
        }
      })
    }
    
// favourite section
    exports.postFavList=(req,res,next)=>{
      console.log("add to Fav ",req.body)
      const homeId= req.body.id;
      Home.findById(homeId).then(([homes,field])=>{
        // console.log('fav data is here ',fav)
        const fav = homes[0];
        console.log(fav);
        const {id,houseName, price, location, rating, photourl ,description} = fav;
        const home = new favHome(houseName, price, location, rating, photourl,description,id);
        // console.log('befor fetchAll',home)
        if(favHome.findById(fav.id).then()){
          res.redirect('/favourites');
        }else{
          home.save();
          res.redirect('/favourites');
        }
      })
    }

    exports.getFavList=(req,res,next)=>{
      favHome.fetchAll().then(([FavHomes,fields])=>{
      console.log("welcome to Fav section")
        res.render('store/fav-list',{FavHomes:FavHomes,pageTitle :'favourite list',currentPage:'Favorite'})}
      )}
  

    exports.postDeleteFav=(req,res,next)=>{
      const homeId = req.params.homeId;
      favHome.deleteById(homeId).then(()=>{
      res.redirect('/favourites');
    }).catch(err=>{
      console.log('error in deleting',err);
    })
    }

    
    

