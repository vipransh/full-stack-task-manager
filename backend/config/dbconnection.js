const mongoose=require('mongoose');

const connectToDB=()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then((conn)=>{
        console.log(`Connected DB: ${conn.connection.host}`);
    })
    .catch((error)=>{
        console.log(error);
        process.exit(1);
    })
};

module.exports=connectToDB;