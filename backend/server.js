//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose")
const _ = require("lodash")
const cors = require('cors')

const app = express();
mongoose.connect("mongodb+srv://admin-shamanth:Test123@cluster0.r8a4o.mongodb.net/todolistDB")

// app.set('view engine', 'ejs');

// app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());
// app.use(express.static("public"));

const itemSchema = new mongoose.Schema({
  item: "String"
});

const listSchema = new mongoose.Schema({
  name: "String",
  items: [itemSchema]
})

const Item = mongoose.model("Item",itemSchema);

const List = mongoose.model("List",listSchema);

const item1 = new Item({
  item: "Welcome! Click the + button to add an item"
});

const item2 = new Item({
  item: "<--Tick this to delete an item"
});

const item3 = new Item({
  item: "Add a custom list by using a new path /ListName"
});

const defaultItems = [item1,item2,item3];


app.get("/", function(req, res) {
  console.log("Default list called")

const day = date.getDate();

Item.find({},function(err, foundItems){

  if(err){
    console.log(err)
  }
  else{
    if(foundItems.length===0){
      Item.insertMany(defaultItems, function(err){
        if(err){
          console.log(err);
        }
        else{
          console.log("Default idems added to the database")
        }
      })
      res.json(foundItems);
      // res.redirect("/");
    }
    else{
      res.json(foundItems);
      // res.render("list", {listTitle: day, newListItems: foundItems});
    }
  }

})

});

app.post("/", function(req, res){

  const itemName = req.body.newText;
  const listName = req.body.urlPath;

  console.log(listName);

  const newItem = new Item ({
    item : itemName
  });



  if(listName ===""){
    newItem.save((err) => {
      if (err) {
        res.send("Error")
      }
      else {
        res.send("Added new item!")
      }
    });

  }else{
    List.findOne({name:listName}, function(err,foundList){
      if(!err){
        foundList.items.push(newItem)
        foundList.save()
        res.send("Added new item!")
      }
    })
  }

});

app.post("/remove", function(req, res){

  const itemId = req.body.itemId;
  const listName = req.body.urlPath;

  if(listName ===""){

  Item.findByIdAndRemove(itemId, function(err){
    if(!err){
     res.send("Item removed"+itemId)
    }
    else{
      console.log(err);
      res.send("Some error occured")
    }
  })
}
else{
  List.findOneAndUpdate({name:listName},{$pull : {items: {_id:itemId}}}, function(err,foundList){
    if(!err){
      res.send("Item removed" + itemId)
    }
    else {
      console.log(err);
      res.send("Some error occured")
    }
  })
}
});

app.get("/:customListName", function(req,res){

  var cusListName = _.capitalize(req.params.customListName);
  console.log("Custom list get called")

  List.findOne({name:cusListName},function(err, foundList){
    if(!err){
      if(!foundList){
        const cusList = new List({
          name: cusListName,
          items: defaultItems
        });
        cusList.save()
        res.redirect("/"+cusListName)
      }
      else{
        
        res.json(foundList);
          // res.render("list", {listTitle: cusListName, newListItems: foundList.items});
      }

    }
  })


})

app.get("/about", function(req, res){
  res.send("Page not developed")
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port, function() {
  console.log("Server started successfully");
});
