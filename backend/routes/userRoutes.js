const express=require('express');
const {home, signUp, createTodo, getTodo, search, getUser, deleteTodo, update}=require('../controllers/userController');

const router=express.Router();

router.get("/", home);
router.post("/signUp", signUp);
router.post("/createTodo/:id", createTodo)
router.get("/getTodo/:id", getTodo);
router.get("/search/:userId/:searchKey", search);  
router.get("/getUser/:id", getUser);
router.delete("/deleteTodo/:userId/:todoId", deleteTodo);
router.put("/update/:id", update)

module.exports=router;
