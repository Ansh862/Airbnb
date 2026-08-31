const { getDB } = require("../utils/database");
const {ObjectId}=require('mongodb');

module.exports = class Home {
  constructor(houseName, price, location ,rating, photo,description,hostId) {
    this.houseName = houseName.toUpperCase();
    this.price = price;
    this.location = location;
    this.rating = rating;
    if(photo){
      this.photo = photo;
    }
    this.description = description;
    this.hostId = hostId;
  }
  
  save(){ 
    const db = getDB();
      return db.collection('homes').insertOne(this);
   }

   static update_Save(home,id){
    const db = getDB();
    return db.collection('homes').updateOne({_id: new ObjectId(String(id))},{$set : home});
   }

  static fetchAll() {
    const db = getDB();
    return db.collection('homes').find().toArray()
  }
   
  static findById(homeId){
    const db = getDB();
    return db.collection('homes').find({_id: new ObjectId(String(homeId))}).next()
  }
  
  static deleteById(homeId){
    const db = getDB();
    return db.collection('homes').deleteOne({_id: new ObjectId(String(homeId))})
  }

};