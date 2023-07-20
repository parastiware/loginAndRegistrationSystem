const bcrypt = require('bcrypt');
const User = require('../models/user');

const registerUser = async (req, res) => {
  const { name, email, gender, username, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name: name,
      email: email,
      gender: gender,
      username: username,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user.' });
  }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find the user in the database
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      // Compare the provided password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials.' });
      }
  
      res.json({ message: 'Login successful.' });
    } catch (error) {
      res.status(500).json({ error: 'Login failed.' });
    }
  };


  

const getUserList = async (req, res) => {
  try {
    const userList = await User.find({}, { password: 0 }); // Exclude the password field from the response
    res.json(userList);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user list.' });
  }
};

const updateUser = async (req, res) => {
  const { name, email, gender } = req.body;
  const { username } = req.params;

  try {
    const user = await User.findByUsername(username);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.gender = gender || user.gender;

    await user.save();

    res.json({ message: 'User updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user.' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserList,
  updateUser,
};