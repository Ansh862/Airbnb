const Home = require('../models/home');
const favHome = require('../models/fav');

//user request
exports.getbookings=(req,res)=>{
  console.log("welcome to bookings section")
  res.render('store/booking',{pageTitle :'Booked Homes',currentPage:'Bookings'})
}

exports.getIndex=(req,res)=>{
  console.log("welcome to Index section")
  res.render('store/Index',{pageTitle :'airbnb Homes',currentPage:'Index'})
}




exports.getHomes = (req,res,next)=>{
  const registeredHomes = Home.fetchAll(
    (registeredHomes)=>{
      // console.log(registeredHomes);
      res.render('store/home-list',{registeredHomes,pageTitle :'Homes list',currentPage:'Home'})
    });}
    
    exports.getHomeDetails = (req,res,next)=>{
      const homeId = req.params.homeId;
      console.log(homeId);
      Home.findById(homeId,home=>{
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
      Home.findById(homeId,fav=>{
        // console.log('fav data is here ',fav)
        const {id,houseName, price, rating, photourl} = fav;
        const home = new favHome(id,houseName, price, rating, photourl);
        // console.log('befor fetchAll',home)
        home.save();
        res.redirect('/favourites');
      })
    }

    exports.getFavList=(req,res)=>{
      console.log("welcome to Fav section")
      const FavHomes = favHome.fetchAll(FavHomes=>{
        res.render('store/fav-list',{FavHomes:FavHomes,pageTitle :'favourite list',currentPage:'Favorite'})
      })
    }

    exports.postDeleteFav=(req,res,next)=>{
      const homeId = req.params.homeId;
      console.log("y rhi id ",homeId)
      favHome.deleteById(homeId,()=>{
      console.log("ho gya delete..khus ab")
    })
      res.redirect('/favourites');
    }

    
    

