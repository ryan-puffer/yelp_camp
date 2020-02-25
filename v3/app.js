var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");
    Campground = require("./models/campground");
    seedDB = require("./seeds");


mongoose.connect("mongodb://localhost/yelp_camp_v3", {
    useNewUrlParser: true,
    useUnifiedTopology: true
    });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();




   



app.get("/", function(req, res){
    res.render("landing");
});

//INDEX -- show all campgrounds
app.get("/campgrounds", function(req, res){
    //get all campgrounds from db
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds:allCampgrounds});
            
        }
    })
});

//CREATE -- add new campground to db
app.post("/campgrounds", function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc} //don't really understand this yet
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds"); //default is to redirect as a get route
        }
    })//create a new campground and save to db
    //redirect back to campgrounds page
});

//NEW -- show form to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("new");
});


//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            //render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
 
    //show that campground
    
});


app.listen(3000, function(){
    console.log("YelpCamp Server has started!");
});