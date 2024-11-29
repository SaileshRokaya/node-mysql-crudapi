const express = require('express');
const multer = require('multer');
const { 
    getUsers, 
    getUser, 
    createUser, 
    updateUser, 
    deleteUser 
} = require('../controllers/userController');
const router = express.Router();

// File upload setup
const upload = multer({ dest: 'uploads/' });

// Routes
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users', upload.single('photo'), createUser);
router.put('/users/:id', upload.single('photo'), updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;
