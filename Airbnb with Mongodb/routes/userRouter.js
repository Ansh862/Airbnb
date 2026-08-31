
//external module
const express = require('express');
const userRouter = express.Router();

const { getHomes ,getbookings,getIndex,getFavList,getHomeDetails ,postFavList,postDeleteFav} = require('../controller/usercontroller');

userRouter.get('/', getHomes);
userRouter.get('/bookings',getbookings);
userRouter.get('/favourites',getFavList);
userRouter.post('/favourites',postFavList);
userRouter.get('/homes/:homeId',getHomeDetails);
userRouter.post('/favourites/:homeId',postDeleteFav);

module.exports = userRouter;