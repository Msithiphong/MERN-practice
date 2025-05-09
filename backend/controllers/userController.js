const User = require('../models/user');

exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: 'Failed creating user' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users) {
            return res.status(404).json({ message: 'Users not found' });
        }

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Retrieving users failed' });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, email },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: 'User update failed' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deleteUsers = await User.deleteOne({ _id: req.params.id });
        if (deleteUsers === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' })
    } catch (error) {
        res.status(400).json({ message: err.message })
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user)
    } catch (error) {
        res.status(400).json({ message: 'User email invalid' })
    }
}