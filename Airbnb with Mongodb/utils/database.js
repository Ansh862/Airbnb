
const mongo = require('mongodb');

const MongoClient = mongo.MongoClient;

const MONGO_URL ="mongodb+srv://nagaransh862_db_user:121079@cluster0.gbgh3zc.mongodb.net/airbnb?appName=Cluster0";

let _db;

const mongoConnect =(callback)=>{
  MongoClient.connect(MONGO_URL)
  .then(client=>{
    _db=client.db('airbnb')
    callback();
  })
  .catch(err=>{ 
    console.log('error while connecting Mongo', err);
  });
}
 
const getDB=()=>{
  if(!_db){
    throw new Error("Database not connected");
  }else{
    return _db;
  }
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
exports.MONGO_URL= MONGO_URL;


