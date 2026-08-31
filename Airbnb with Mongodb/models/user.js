const { getDB } = require("../utils/database");
const {ObjectId}=require('mongodb');


module.exports = class User {
  constructor(name, email, password ,userType,favourite,hostHomes) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.userType = userType;
    this.favourite=[];
    this.hostHomes=[];

  }
  
  save(){
    const db = getDB();
    return db.collection('user').insertOne(this);
  }

  static saveHostHomes(hostId){
    const db = getDB();
    return db.collection('homes').findOne({hostId:new ObjectId(String(hostId))}).then(home=>{  
    return db.collection('user').updateOne({_id:new ObjectId(String(hostId))},{$push:{hostHomes:home}})
    })
  }

  static fetchHostHomes(hostId){
    const db = getDB();
    return db.collection('user').findOne({_id:new ObjectId(String(hostId))}).then(user=>{
      return user.hostHomes;
    })
  }

  static updateGuestFav(home,homeId){
    const db=getDB();
    home._id=new ObjectId(String(homeId));
    return db.collection('user').updateMany(
      {userType:{$in:['guest','host']},
        'favourite._id': home._id
      },
      {$set : {
        'favourite.$': home
      }
      }
    )
  }

  static deleteAllFavs(homeId){
    const db=getDB();
    return db.collection('user').updateMany(
      {userType:{$in:['guest','host']},
        'favourite._id': new ObjectId(String(homeId))
      },
      {$pull :{
        favourite:{_id:new ObjectId(String(homeId))}
      }
      }
    )
  }
  
  static deleteFavs(email,homeId){
    const db=getDB();
      return db.collection('user').updateOne({email:email},{$pull:{favourite:{_id:new ObjectId(String(homeId))}}})
    }

  static fetchAllFavs(email,callback){
    User.findByEmail(email).then(user=>{
      const favHomes = user.favourite;
      return callback(favHomes);
    })
  }

  static findFav(user,homeId,callback){
    const favHomes = user.favourite;
    callback(favHomes.some(fav=>{String(fav._id)===String(homeId)}));
  }

  static addToFav(email,home){
    const db=getDB();
    return db.collection('user').updateOne({email:email},{$push:{favourite:home}})
  }

  static findByEmail(email){
    const db=getDB();
    return db.collection('user').findOne({email:email});
  }
}
