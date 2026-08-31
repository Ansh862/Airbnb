// core module
const db = require('../utils/database');



module.exports = class Home {
  constructor(houseName, price, location ,rating, photourl,description,id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photourl = photourl;
    this.description = description;
    this.id = id;
  }
  
  save(){ 
    if(this.id){
      return db.execute('UPDATE homes SET houseName=?,price=?,location=?,rating=?,photourl=?,description=? WHERE id=?',[this.houseName,this.price,this.location,this.rating,this.photourl,this.description,this.id]  )
    }else{
      return db.execute('INSERT INTO homes(houseName,price,location,rating,photourl,description) VALUES(?,?,?,?,?,?)',[this.houseName,this.price,this.location,this.rating,this.photourl,this.description])
    }
   }

  static fetchAll() {
  return db.execute('SELECT * FROM homes')
  }
   
  static findById(homeId){
    return db.execute('SELECT*FROM homes WHERE id=?', [homeId]);
  }
  static deleteById(homeId){
    return db.execute('DELETE FROM homes WHERE id=?',[homeId]);
  }

};