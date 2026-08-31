export const UsernameController =(req,res)=>{
    const username = req.params.username
    res.send(`welcome ${username}`)
}

export const SearchController =(req,res)=>{
     const keyword = req.query.keyword
     res.send(`Searching for ${keyword}`) 
}

export const userlogin = (req,res)=>{
    res.send(`this is user login route`)
}

export const usersignup = (req,res)=>{
    res.send(`this is user signup route`)
}



