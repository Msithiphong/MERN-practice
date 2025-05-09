const User = require('../models/user');

exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


exports.updateUsers = async (req, res) => {
    
    const { id } = req.params;
    const { name, email } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email },
            { new: true }
        );
        if (!updatedUser)
            res.status(404).json({ message: 'User not found'});

        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message});
    }
};