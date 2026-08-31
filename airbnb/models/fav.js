const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');

const favDataPath = path.join(rootDir, 'data', 'fav.json');

module.exports = class Home {
  constructor(id,houseName, price, rating, photourl) {
    this.id = id;
    this.houseName = houseName;
    this.price = price;
    this.rating = rating;
    this.photourl = photourl;
  }
  
  save() {
    Home.fetchAll((FavHomes)=>{
      if(FavHomes.find(home=>home.id === this.id)){
        return {};
      }else{
        FavHomes.push(this);
        fs.writeFile(favDataPath, JSON.stringify(FavHomes), (err) => {console.log("file writing concluded", err)});
      }
    })
    }
// we use callback here to make sync between them
  static fetchAll(callback) {
    const readfile = fs.readFile(favDataPath,(err,data)=>{
      callback(!err ? JSON.parse(data):[]);
  })
} 

  static findById(homeId,callback){
    this.fetchAll(homes =>{
      const houseFound = homes.find(home => home.id === homeId)
      callback(houseFound);
    })
  }
  // here homes = JSON.parse(data)

  static deleteById(homeId,callback){
      this.fetchAll(homes=>{
      const updatedHomes = homes.filter(home=> home.id !== homeId)
      fs.writeFile(favDataPath, JSON.stringify(updatedHomes), (err) => {console.log("Home deleted", err)});
      callback();
      })
    }
}