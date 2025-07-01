const db = require('../../models');
const User = db.User;
const { success, error } = require('../utils/response');
import { Request, Response } from 'express';


exports.createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    return success(res, user, 'User created successfully', 201);
  } catch (err) {
    return error(res, 'Failed to create user', 400, err);

  }
};

exports.getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    return success(res, users, 'All users fetched');
  } catch (err) {
    return error(res, 'Failed to fetch users', 500, err);
  }
};

exports.getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return error(res, 'User not found', 404);
    return success(res, user, 'User fetched');
  } catch (err) {
    return error(res, 'Failed to fetch user', 500, err);
  }
};

exports.updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return error(res, 'User not found', 404);

    await user.update(req.body);
    return success(res, user, 'User updated');
  } catch (err) {
    return error(res, 'Failed to update user', 400, err);
  }
};

exports.deleteUser = async (req: Request, res: Response) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (deleted) {
      return success(res, {}, 'User deleted successfully');
    } else {
      return error(res, 'User not found', 404);
    }
  } catch (err) {
    return error(res, 'Error deleting user', 500, err);
  }
};

