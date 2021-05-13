//jshint esversion:6

const mongoose =  require("mongoose");

mongoose.set('useNewUrlParser', true);

mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost:27017/fruitsDB");



const fruitSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, "Why no name?"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const personSchema = new mongoose.Schema ({
  name: String,
  Age: Number,
  favouriteFruit: fruitSchema
});

const Person = mongoose.model("person", personSchema);

const Fruit = mongoose.model("Fruit", fruitSchema);


const fruit = new Fruit ({
  name : "Banana",
  rating : 7,
  review : "Great"
});

fruit.save();


const person = new Person ({
  name: "Girl",
  Age: 27,
  //let's assume we want to establish relationships between fruits and person, what do we do?
  favouriteFruit: fruit
});

// person.save();

Person.updateOne({_id:"608ca8608f58812d8ce53bd5"}, {favouriteFruit: fruit}, function(err) {
  if (err) {
    console.log(err);
  }
  else {
    console.log("Updated successfully");
  }
});







// const Apple = new Fruit ({
//   name : "Apple",
//   score : 8,
//   review : "Great"
// });
//
// const Orange = new Fruit ({
//   name : "Orange",
//   score : 6,
//   review : "Kinda Sour"
// });
//
// const Banana = new Fruit ({
//   name : "Banana",
//   score : 9,
//   review : "Great Stuff"
// });

Fruit.insertMany([Apple, Orange, Banana], function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully saved all the fruits");
  }
});

// Fruit.deleteOne({name: "Peach"}, function(err) {
//   if (err) {
//     console.log(err);
//   }
//   else
//   console.log("Deleted successfully");
// });


Person.find(function(err, persons) {
  if (err) {
    console.log(err);
  } else {
    mongoose.connection.close();
    persons.forEach(function(person) {
      console.log(person);
    });
  }
});




//
// Fruit.find(function(err, fruits) {
//   if (err) {
//     console.log(err);
//   } else {
//     mongoose.connection.close();
//     fruits.forEach(function(fruit) {
//       console.log(fruit.name);
//     });
//   }
// });


// Fruit.updateOne({_id:"608cc445f1d4d4050c969d83"}, {name: "Peach"}, function(err) {
//   if (err) {
//     console.log(err);
//   }
//   else
//   console.log("Updated successfully");
// });





// const findDocuments = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection('fruits');
//   // Find some documents
//   collection.find({}).toArray(function(err, fruits) {
//     assert.equal(err, null);
//     console.log("Found the following records");
//     console.log(fruits);
//     callback(fruits);
//   });
// }
