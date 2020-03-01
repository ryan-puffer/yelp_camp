var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");
    Campground = require("./models/campground");
    Comment = require("./models/comment");
    seedDB = require("./seeds");



mongoose.connect("mongodb://localhost/yelp_camp_v4", {
    useNewUrlParser: true,
    useUnifiedTopology: true
    });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
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
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
            
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
    res.render("campgrounds/new");
});


//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
 
    //show that campground
    
});


// =========================
// COMMENTS ROUTES
// =========================

app.get("/campgrounds/:id/comments/new", function(req, res){
    //find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else {
            res.render("comments/new", {campground: campground})
        }
    })
    
});

app.post("/campgrounds/:id/comments", function(req, res){
    //lookup campground using Id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            })

        }
    })
    //create new comment
    //connect new comment to campground
    //redirect to campground show page

})

app.listen(3000, function(){
    console.log("YelpCamp Server has started!");
});