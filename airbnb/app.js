// external module
const express = require('express');
const path = require('path');
// local module
const userRouter = require('./routes/userRouter');
const {hostRouter} = require('./routes/hostRouter');

// local module
const rootDir = require('./utils/path');
const {error404} = require('./controller/error');


const app = express();

app.set('view engine','ejs');
app.set('views','views');

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded());
app.use(userRouter);
app.use("/host",hostRouter);
app.use('/user',userRouter);
app.use( error404);


const port =3000;
app.listen(port,()=>{
  console.log(`server is running on http://localhost:${port}`)
})