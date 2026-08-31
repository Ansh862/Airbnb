const Home = require('../models/home');

const User = require('../models/user');

//user request
exports.getbookings=(req,res,next)=>{
  console.log("welcome to bookings section")
  res.render('store/booking',{pageTitle :'Booked Homes',currentPage:'Bookings',isLoggedIn:req.isLoggedIn,userType:req.userType})
}


exports.getHomes = (req,res,next)=>{
  Home.fetchAll().then(registeredHomes=>{
    console.log("welcome to Home section")
      res.render('store/home-list',{registeredHomes,pageTitle :'Homes list',currentPage:'Home',isLoggedIn:req.isLoggedIn,userType:req.userType})
    });
  }
    
    exports.getHomeDetails = (req,res,next)=>{
      const homeId = req.params.homeId;
      console.log('Requested homeId:', homeId);
      Home.findById(homeId).then(home=>{
        console.log(home);
        if(!home){
          console.log("home not found");
          res.redirect("/");
        }else{
          // console.log("home Details Found ",home);
          res.render('store/home-detail',{home : home,pageTitle :'Homes Detail',currentPage:'Home',isLoggedIn:req.isLoggedIn,userType:req.userType})
        }
      })
    }
    
// favourite section
    exports.postFavList=(req,res,next)=>{
      console.log("add to Fav ",req.body)
      const homeId= req.body.id;
      Home.findById(homeId).then(fav=>{
        // console.log('fav data is here ',fav)
        // console.log(fav);
        const email=req.email;
        User.findByEmail(email).then(user=>{
          User.findFav(user,homeId,(ans)=>{
            console.log('ans is here',ans)
            if(!ans){
              User.addToFav(email,fav).then(ans=>{
                console.log('added to fav in ',email)
              })
            }else{
              res.redirect('/favourites')
            }
          })
        })
      });
    };
    

    exports.getFavList=(req,res,next)=>{
      const email = req.email
      User.fetchAllFavs(email,(FavHomes)=>{
      res.render('store/fav-list',{FavHomes:FavHomes,pageTitle :'favourite list',currentPage:'Favorite',isLoggedIn:req.isLoggedIn,userType:req.userType});
      })
      }
    

    exports.postDeleteFav=(req,res,next)=>{
      const homeId = req.params.homeId;
      const email = req.email;
      User.deleteFavs(email,homeId).then(()=>{
        console.log("fav home deleted")
        res.redirect('/favourites');
      }).catch(err=>{
        console.log('err while deleteing',err);
      })
    }

    
    

