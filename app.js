const express=require('express');
const oauthRoutes=require("./routes/auth-routes");
const profileRoutes=require("./routes/profile-routes");
const passportSetup=require("./config/passport-setup");
const mongoose=require('mongoose');
const keys=require('./config/keys');
const cookieSession=require('cookie-session');
const passport=require('passport');



const app=express();


//set up view engine
app.set('view engine', 'ejs');

//cookieSession
app.use(cookieSession({
  maxAge:24*60*60*1000,
  keys:[keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());


//conect to mongobd
mongoose.connect(keys.mongodb.dbURI,()=>{
  console.log("conected to kongodb");
});

//use
app.use("/auth",oauthRoutes);
app.use("/profile",profileRoutes);

//create home route
app.get('/',(req,res)=>{
  res.render('home',{user:req.user});
});



app.listen(3008,()=>{
  console.log("itss working");
});
