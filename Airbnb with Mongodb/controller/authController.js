const { check, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs')
const Home = require("../models/home");
const User = require("../models/user");


exports.getLogin=(req,res,next)=>{
  res.render('auth/login',{pageTitle:'login', currentPage:'login',isLoggedIn:req.isLoggedIn,errors : [],oldInput:{email:''}})
}

exports.getpassword=(req,res,next)=>{
  res.render('auth/password',{pageTitle:'password',currentPage:'passwword',isLoggedIn:false})
}

exports.postpassword=(req,res,next)=>{
  console.log(req.body)

  check('email')
  .isEmail()
  .withMessage('please Enter valid email')
  .normalizeEmail(),

  check('Newpassword')
  .isLength({min:8})
  .withMessage('Password must be at least 8 character long')
  .matches(/[A-Z]/)
  .withMessage('Password should contain at least one uppercase latter')
  .matches(/[a-z]/)
  .withMessage('Password should contain at least one lowercase latter')
  .matches(/[0-9]/)
  .withMessage('Password should contain at least one number')
  .matches(/[@#&]/)
  .withMessage('Password should contain at least one special character among(@,#,&)')
  .trim(),

  check('Confirmpassword')
  .custom((val,{req})=>{
    if(val!==req.body.Oldpassword){
      throw new Error('Password do not match');
    }
    return true;
  })

}

exports.postLogin=(req,res,next)=>{
  const {email,password}=req.body;
  User.findByEmail(email).then(async(user)=>{
    if(!user){
      return res.status(422).render('auth/login',{
        pageTitle:'login', 
        currentPage:'login',
        isLoggedIn:false,
        errors : ["User does not exist"],
        oldInput:{email}
      })
    }else{
      const isMatch = await bcrypt.compare(password,user.password);
      if(!isMatch){
        return res.status(422).render('auth/login',{
        pageTitle:'login', 
        currentPage:'login',
        isLoggedIn:false,
        errors : ["Invalid Password"],
        oldInput:{email}
      })
      }
      req.session.isLoggedIn = true;
      req.session.user = user
      res.redirect('/');
    }
  }).catch(err=>{
    console.log(err);
    return res.redirect('/');
  })
  // req.isLoggedIn = true;
  // res.cookie('isLoggedIn',true);
}

exports.getLogout=(req,res,next)=>{
  // res.cookie('isLoggedIn',false);
  req.session.destroy(()=>{
    res.redirect('/login')
})
}

exports.getSignup=(req,res,next)=>{
  res.render('auth/signup',{pageTitle:'Signup',currentPage:'Signup',isLoggedIn:req.isLoggedIn,oldInput:'undefined',errors:[]})
}

exports.postSignup=[
  //Full Name Validation
  check('name')
  .notEmpty()
  .withMessage('Name is required')
  .isLength({min:2})
  .withMessage('Full name must be at least 2 characters long')
  .matches(/^[a-zA-Z\s]+$/)
  .withMessage('Name can only contain letters'),

  // email validation
  check('email')
  .isEmail()
  .withMessage('Please enter valid Email')
  .normalizeEmail(),

  //password validation
  check('password')
  .isLength({min:8})
  .withMessage('Password should be atleast 8 character long')
  .matches(/[A-Z]/)
  .withMessage('Password should contain at least one uppercase latter')
  .matches(/[a-z]/)
  .withMessage('Password should contain at least one lowercase latter')
  .matches(/[0-9]/)
  .withMessage('Password should contain at least one number')
  .matches(/[@#&]/)
  .withMessage('Password should contain at least one special character among(@,#,&)')
  .trim(),
  
  //confirm password 
  check('confirmPassword')
  .custom((val,{req})=>{
    if(val!==req.body.password){
      throw new Error('Password do not match');
    }
    return true;
  }),

  //user type
  check('userType')
  .notEmpty()
  .withMessage('Please enter user type')
  .isIn(['guest','host'])
  .withMessage('Invalid user type'),

  //terms and conditions
  check('termsAndConditions')
  .notEmpty()
  .withMessage('Please accept the terms and conditions')
  .custom((val,{req})=>{
    if(val!=='on'){
      throw new Error('Please accept terms ans conditons');
    }
    return true;
  }),

  (req,res,next)=>{
    const {name,email,password,confirmPassword,userType}=req.body;
    User.findByEmail(email).then(ans=>{
      if(ans!==null){
        return res.status(422).render('auth/signup',{
        pageTitle:'Signup',
        currentPage:'Signup',
        isLoggedIn:'false',
        errors:["This email is already registered "],
        oldInput:{name,email,userType}
      })
    }else{
    const error = validationResult(req);
    if(!error.isEmpty()){
      return res.status(422).render('auth/signup',{
        pageTitle:'Signup',
        currentPage:'Signup',
        isLoggedIn:'false',
        userType:userType,
        errors: error.array().map(err => err.msg),
        oldInput:{name,email,userType}
      });
    }else{
      bcrypt.hash(password,12)
      .then(hashedPassword=>{
        const user = new User(name,email,hashedPassword,userType)
        user.save().then(ans=>{
          console.log(ans);
          res.redirect('/login');
        })
      }).catch(err=>{
        return res.status(422).render('auth/signup',{
        pageTitle:'Signup',
        currentPage:'Signup', 
        isLoggedIn:'false',
        userType:userType,
        errors: [err.message],
        oldInput:{name,email,userType}
      })
      })
    }}})
  }
]
