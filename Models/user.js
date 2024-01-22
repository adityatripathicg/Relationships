const mongoose = require("mongoose");
const {Schema} = mongoose; 

main().then(()=>console.log("Connection Successful")).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationdemos');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const userSchema = new Schema({
    username:String,
    addresses : [
        {
            _id : false,
            location :String,
            city : String
        },
    ],
});

const User = mongoose.model("User", userSchema);

const addUsers = async() => {
    let user1 = new User({
        username : "Sherlock",
        addresses :[{
            location: "123,Ranjhi",
            city:"Jbp"
        }]
    })
    user1.addresses.push({location:"1234,Ranjhi", city:"Mumbai"});
    let res = await user1.save();
    console.log(res);
} 
addUsers();
