const db = require('../models');
const { createToken } = require("../middleware/auth");
const Auth = db.Auth;

const {error , success} = require('../Utils/response');


exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Auth.findOne({ where: { username } });
    if (!user || !(await user.validatePassword(password))) {
      return error(res, 'Invalid username or password', 401);
    }

    const userData = user.dataValues;
    delete userData.password;   
    const token = createToken(userData);
    success(res, {...userData , token}, 'Login successful', 200);
  } catch (err) {
    return error(res, 'Login failed', 500, err);
  }
}