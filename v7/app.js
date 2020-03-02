var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user")
    seedDB = require("./seeds");



mongoose.connect("mongodb://localhost/yelp_camp_v6", {
    useNewUrlParser: true,
    useUnifiedTopology: true
    });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();


//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Redford is the best.",
    resave: false,     //THESE LINES ALWAYS GO WITH PASSPORT SETUP
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); //COMES WITH PASSPORT
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

   
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})





app.listen(3000, function(){
    console.log("YelpCamp Server has started!");
});