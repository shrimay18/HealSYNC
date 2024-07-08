const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://hemkesh123kantawala:mongodbpw@test.o1jxyno.mongodb.net/?retryWrites=true&w=majority&appName=test")
.then(() => {
    console.log("Connected to database!");
})
.catch((err) => {
    console.log("Connection failed!");
    console.log(err);
});

const logInSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const LogInCollection=new mongoose.model('LogInCollection',logInSchema)

module.exports=LogInCollection