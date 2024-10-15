const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb+srv://blessing:Noble123@students-data2.s4lcn.mongodb.net/Students-Data2");

connect.then(() => {
    console.log("Database connected successfully");
})
.catch((error) => {
    console.log("Database cannot be connected", error); 
})
const userSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const collection = new mongoose.model("users", userSchema);
module.exports = collection; 