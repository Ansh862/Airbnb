// core module
const path = require('path');

//external module
const express = require('express');
const userRouter = express.Router();

// local module
const rootDir = require('../utils/path');

const { getHomes ,getbookings,getIndex,getFavList,getHomeDetails ,postFavList,postDeleteFav} = require('../controller/usercontroller');


userRouter.get('/', getHomes);
userRouter.get('/bookings',getbookings);
userRouter.get('/Index',getIndex);
userRouter.get('/favourites',getFavList);
userRouter.post('/favourites',postFavList);
userRouter.get('/homes/:homeId',getHomeDetails);
userRouter.post('/favourites/:homeId',postDeleteFav);




module.exports = userRouter;