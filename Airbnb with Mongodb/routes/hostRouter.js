
// external module
const express = require('express')
const hostRouter = express.Router();

const { getAddHome,postAddHome,getHostHomes,getEditHome,postEditHome,postDeleteHome} = require('../controller/hostcontroller');

hostRouter.get('/add-home', getAddHome);
hostRouter.post('/add-home', postAddHome);
hostRouter.get('/host-home-list', getHostHomes);
hostRouter.get('/edit-home/:homeId', getEditHome);
hostRouter.post('/edit-home', postEditHome);
hostRouter.post('/host-home-list/:homeId', postDeleteHome);


exports.hostRouter = hostRouter;

