const Todo = require('../models/Todo');

const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTodo = new Todo({
            title,
            description,
        });
        const savedTodo = await newTodo.save();
        res.status(201).json({ success: true, data: savedTodo });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json({ success: true, data: todos });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { title, description, updatedAt: Date.now() },
            { new: true }
        );
        if (!updatedTodo) {
            return res.status(404).json({ success: false, message: 'Todo not found' });
        }
        res.status(200).json({ success: true, data: updatedTodo });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ success: false, message: 'Todo not found' });
        }
        res.status(200).json({ success: true, message: 'Todo deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo,
};
