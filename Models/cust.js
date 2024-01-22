const mongoose = require("mongoose");
const {Schema} = mongoose; 

main().then(()=>console.log("Connection Successful")).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationdemos');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const orderSchema = new Schema({
    item : String,
    price : Number,
});

const customerSchema = new Schema({
    name : String,
    orders : [
        {
            type : Schema.Types.ObjectId,
            ref: "Order"
        },
    ],
});


const order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

// const addCust = async ()=>{
// //     let cust1 = new Customer({
// //         name: "Rahul Kumar",
// //     });
// //     let order1 = await order.findOne({item:"Chips"});
// //     let order2 = await order.findOne({item:"Chocolate"});

// // cust1.orders.push(order1);
// // cust1.orders.push(order2);

// //  let res = await cust1.save();
// //  console.log(res); 
// };

// addCust();
// const addOrders = async ()=>{
//     let res = await order.insertMany([
//         {item:"Samosa",price:12},
//         {item:"Chips", price: 10},
//         {item:"Chocolate", price: 40},
//     ]);
//     console.log(res);
// };

// addOrders();
const findCust = async () =>{
    let result = await Customer.find({}).populate("orders");
    console.log(result[0]);
}
findCust();