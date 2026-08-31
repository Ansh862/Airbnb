import express from 'express';
import bodyParser from 'body-parser';
const app = express();


  app.use((req,res,next)=>{
    console.log("first dummy middleware",req.url,req.method);
    next();
  })

  app.use((req,res,next)=>{
    console.log("second dummy middleware",req.url,req.method);
    next();
  })

  app.get('/',(req,res,next)=>{
    console.log("handling / for get",req.url,req.method);
    res.send(`<h1>welcome</h1>`);
  })

  app.get('/contact-us',(req,res,next)=>{
    console.log("handling /contact-us for get",req.url,req.method);
    res.send(`<h1>please give your details</h1>
              <form action="/contact-us" method="POST">
              <INPUT type ="text" placeholder="enter your name" name="name"/>
              <INPUT type ="text" placeholder="enter your email" name="email"/>
              <input type="submit" value="submit">
              </form>
    `);
  })

  app.post('/contact-us',(req,res,next)=>{
    console.log("handling first ",req.url,req.method,req.body)
    next();
  })

  app.use(bodyParser.urlencoded());

  app.post('/contact-us',(req,res,next)=>{
    console.log("handling /contact-us for post ",req.url,req.method,req.body)
    res.send('<h1>WE WILL CONTACT YOU SHORTLY</h1>')
  })

  const port =3000;
  app.listen(port,()=>{
    console.log(`server is running on address http://localhost:${port}`);
  });