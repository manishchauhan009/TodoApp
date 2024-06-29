const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoControllers');

router.get("/",async (req,res)=>{
  res.send("Welcome to home route")
})
router.post('/createtodos', todoController.createTodo);
router.get('/todos', todoController.getTodos);
router.put('/todos/:id', todoController.updateTodo);
router.delete('/todos/:id', todoController.deleteTodo);

module.exports = router;
