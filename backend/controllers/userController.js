const User=require('../model/userSchema');

// Home Route
exports.home=(req,res)=>{
    res.send("Welcome home");
};

// SignUP Route
exports.signUp=async (req,res)=>{
    try {
        const {appwriteUserId,name,email}=req.body;
        if(!(appwriteUserId && name && email))
        {
            res.status.send("All feilds are required");
        }

        // validate email with regex
        const emailRegex= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!(email.match(emailRegex)))
        {
            throw new error("Invalid email");
        }

        // check if user already exists
        const existingUser=await User.findOne({email});
        if(existingUser)
        {
            throw new error("Email already exists in database, try login");
        }

        // create a entry in database

        const user= await User.create({
            appwriteUserId,
            name,
            email,
        });

        res.status(201).json({
            success: true,
            message: "User created successfully"
        });

    } catch (error) {
        console.log(error);
    }
};

// create todo
exports.createTodo=async (req,res)=>{
   try {
    const {title,task}=req.body;
    // const userId="ramu@gamil.com"
    // const userId='638578b8babd19ddd63df2a5'
    const userId=req.params.id;
    // const userId='638636bd17f089c8ad1364fd'
    const user=await User.findById({"_id": userId});
  

    if(!(title && task))
    {
        throw new error("title and task are required");
    }

    const todo= await user.updateOne({
      
            $push:{
                todo: {
                    title, 
                    task
                }
            }
    });

    res.status(201).json({
        success: true,
        message: "todo updated successfully",
        todo
    });
   } catch (error) {
    res.status(402).json({
        success: false,
        message: error.message
    });
   }
};

// get Todo
exports.getTodo=async(req,res)=>{
    try {
        const userId=req.params.id;
    
        const todolist=await User.find({"_id": userId},{todo: {title: 1}});
        // console.log(todolist);
        res.status(201).json({
            success: true,
            message: "fetched todo list successfully",
            todolist
        });

    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

// get user from appwriteId

exports.getUser=async(req,res)=>{
    try {
        const appwriteUserId=req.params.id;
        const user=await User.find({appwriteUserId});
        // console.log(user);
        if(!(user[0]._id))
        {
            res.status(401).json({
                success: false,
                message: "user not found"
            })
        }
        else
        {
            res.status(201).json({
                success: true,
                message: "user found successfully",
                user
            })
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
};

// search todo
exports.search=async(req,res)=>{
    try {
        const {userId,searchKey}=req.params
        // const {searchKey}=req.body; userId,
       
        const search=await User.find({"_id": userId},{todo: {title: 1}});
     
        if(!search)
        {
            res.status(401).json({
                success: false,
                message: "Title not found in datsbase"
            });
        }
        console.log(search[0].todo[0].task);
        const searchResult=search[0].todo.filter((obj)=>obj.title.toLowerCase().includes(searchKey.toLowerCase()));

       
        res.status(201).json({
            success: true,
            message: "search found successfully",
            searchResult
        })

      
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

// delete a todo
exports.deleteTodo=async(req,res)=>{
    try {
        const {userId,todoId}=req.params
       

        const user=await User.updateOne({_id: userId},{$pull: {todo: {_id: todoId}}});
        res.status(201).json({
            success: true,
            message: "todo deleted successfully",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}

// edit/update a todo
exports.update=async (req,res)=>{
    try {
        const todoId=req.params.id
        const {title,task}=req.body
        if(!(title && task))
        {
            res.status(401).json({
                success: false,
                message: "either title or task is missing"
            })
        }
        else{

            const resp= await User.updateOne({"todo._id":todoId},{$set: {"todo.$.title": title,"todo.$.task": task}});
            res.status(201).json({
                success: true,
                resp
            })
        }
       
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}
