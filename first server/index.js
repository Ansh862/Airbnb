import express from 'express'
import { UsernameController, SearchController, userlogin, usersignup } from './controller.js'
import router from './route.js'

const app = express()
const port = 3000

app.use(express.json())

//DEFINE A SIMPLE ROUTE 
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/contact', (req, res) => {
  res.send('This is contact route')
})

app.get('/user/:username', UsernameController)

//  /search?keyword=express -->> result =   Searching for express
app.get('/search', SearchController)

// // it get response from controller.js
// app.get('/user/login', userlogin)
// app.get('/user/signup', usersignup)

// app.use(`/user`,router)


app.get('/things/:name/:id', (req, res) => {
  const { name, id } = req.params

  // manually validate id is 5 digits
  if(!/^[0-9]{5}$/.test(id)){
    return res.status(400).json({ error: 'ID must be exactly 5 digits' })
  }
  res.json({ id, name })
})


// post method
app.post(`/users`,(req,res)=>{
  const {name ,email} = req.body
  res.json({
    message : `Users ${name} with email ${email} created successfully`
  })
})

app.put(`/users/:id`,(req,res)=>{
  const userId= req.params.id
  const {name,email}= req.body
  res.json({
    message : `Users ${userId} updated to ${name} ,${email}`
  })
})

//delete request
app.delete(`/users/:id`,(req,res)=>{
  const userId = req.params.id
  res.json({
    message:`Users with ID ${userId} deleted successfully`
  })
})

//catch all invalid url

app.get('*splat', (req, res) => {
  res.status(404).send('Sorry this is an invalid URL')
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
}) 