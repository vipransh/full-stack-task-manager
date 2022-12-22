const mongoose=require('mongoose');


const todoModel=new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Title is required"],
        maxlength: [40, "Maximum length is 40 char"]
    },
    task:{
        type: [String]
    }
});

const userModel=new mongoose.Schema({
    appwriteUserId: {
        type: String,
        required: [true, "User Id is required"],
    },
    name:{
        type: String,
        required: [true, "First name is required"],
        maxlength: [20, "Maximum limit is 20 char"],
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
        maxlength: [20, "Maximum limit is 20 char"],
    },
    todo:{
        type: [todoModel]
    }
});

module.exports=mongoose.model("user", userModel);