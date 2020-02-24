var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
    {name: "Salmon Creek", image: "https://pixabay.com/get/55e8dc404f5aab14f6da8c7dda793f7f1636dfe2564c704c722678d5954ac751_340.jpg"},
    {name: "Devil's Butthole", image: "https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c722678d5954ac751_340.jpg"},
    {name: "Lost Penis", image: "https://pixabay.com/get/57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c722678d5954ac751_340.jpg"},
    {name: "Salmon Creek", image: "https://pixabay.com/get/55e8dc404f5aab14f6da8c7dda793f7f1636dfe2564c704c722678d5954ac751_340.jpg"},
    {name: "Devil's Butthole", image: "https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c722678d5954ac751_340.jpg"},
    {name: "Lost Penis", image: "https://pixabay.com/get/57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c722678d5954ac751_340.jpg"}
    ];

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
  res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image} //don't really understand this yet
    campgrounds.push(newCampground); //pushes the data from the form onto the end of the campgrounds array
    //redirect back to campgrounds page
    res.redirect("/campgrounds"); //default is to redirect as a get route
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
})


app.listen(3000, function(){
    console.log("YelpCamp Server has started!");
});