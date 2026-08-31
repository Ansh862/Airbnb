
const fv  = require('../utils/database');

module.exports = class favHome {
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
      return fv.execute('INSERT INTO fav(houseName,price,location,rating,photourl,description,id) VALUES(?,?,?,?,?,?,?)',[this.houseName,this.price,this.location,this.rating,this.photourl,this.description,this.id])
    }
  }


  static fetchAll() {
  return fv.execute('SELECT * FROM fav')
  }
   
  static findById(homeId){
    return fv.execute('SELECT*FROM fav WHERE id=?', [homeId]);
  }

  static deleteById(homeId){
    return fv.execute('DELETE FROM fav WHERE id=?',[homeId]);
  }

};