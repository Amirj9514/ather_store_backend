const db = require('../models');
const User = db.User;

const {error , success} = require('../Utils/response')

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return success(res, users, 'All users fetched');
  } catch (err) {
    return error(res, 'Failed to fetch users', 500, err.errors);
  }
};

exports.getUserById = async (req , res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return error(res, 'User not found', 404);
    return success(res, user, 'User fetched');
  } catch (err) {
    return error(res, 'Failed to fetch user', 500, err.errors);
  }
};

exports.updateUser = async (req , res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return error(res, 'User not found', 404);

    await user.update(req.body);
    return success(res, user, 'User updated');
  } catch (err) {
    return error(res, 'Failed to update user', 400, err.errors);
  }
};

exports.deleteUser = async (req , res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (deleted) {
      return success(res, {}, 'User deleted successfully');
    } else {
      return error(res, 'User not found', 404);
    }
  } catch (err) {
    return error(res, 'Error deleting user', 500, err.errors);
  }
};

exports.createUser = async (req, res) => {
  try {
    const { email, phone } = req.body;

    // Check if email already exists
    const emailExists = await User.findOne({ where: { email } });
    if (emailExists) {
      return error(res, 'Email already in use', 400);
    }

    // Check if phone already exists
    const phoneExists = await User.findOne({ where: { phone } });
    if (phoneExists) {
      return error(res, 'Phone number already in use', 400);
    }

    // Create user
    const user = await User.create(req.body);
    return success(res, user, 'User created successfully', 201);
  } catch (err) {
    return error(res, 'Failed to create user', 400, err.errors);
  }
};