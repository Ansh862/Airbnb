// core module
const path = require('path');

// local module
const userRouter = require('./routes/userRouter');
const {hostRouter} = require('./routes/hostRouter');
const authRouter = require('./routes/authRouter');
const {error404, error500} = require('./controller/error');

// external module
const express = require('express');
const rootDir = require('./utils/path');
const {mongoConnect, MONGO_URL} = require('./utils/database');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const multer = require('multer');

const app = express();

app.set('view engine','ejs');
app.set('views','views');

const store = new MongoDBStore({
  uri: MONGO_URL,
  collection:'sessions'
})

const fileFilter = (req,file,cb)=>{
  if(file.mimetype==='image/png' || file.mimetype==='image/jpg' || file.mimetype==='image/jpeg'){
    cb(null,true);
  }else{
    cb(null,false);
  }
}

const randomString=(length)=>{
  const character='abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * character.length);
    result += character.charAt(randomIndex);
  }
  return result;
}

const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'uploads/');
  },
  filename:(req,file,cb)=>{
    cb(null,randomString(10) +'-'+ file.originalname);
  }
})

const multerOptions={
  storage,
  fileFilter
}

app.use(express.static(path.join(rootDir, 'public')))

app.use(express.urlencoded());

app.use(multer(multerOptions).single('photo'));

app.use(session({
  secret:'project',
  resave:false,
  saveUninitialized:true,
  store
}))

app.use((req,res,next)=>{
  // console.log('cookies are here',req.get('Cookie'));
  // req.isLoggedIn = req.get('Cookie')?req.get('Cookie').split('=')[1] === 'true' : false;
  req.isLoggedIn = req.session?.isLoggedIn || false;
  req.userType = req.session?.user?.userType || null;
  req.email = req.session?.user?.email||null;
  next();
})

app.use('/host',(req,res,next)=>{
  if(req.isLoggedIn){
    next();
  }
  else{
    res.redirect('/login');
  }
})

app.use(authRouter);
app.use("/host",hostRouter);
app.use(['/user',''],userRouter);
app.use(['/uploads','/host/uploads','/user/uploads','/homes/uploads'],express.static(path.join(rootDir, 'uploads')));
// status 400 for client error
app.use( error404);
// status 500 for server error
app.use(error500);

const port =3001;
mongoConnect(()=>{
  app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
  })
})