const User = require('../models/User');

exports.getAllUsers = async (req, res, next) => {
  let users;
  try {
    [users, _] = await User.findAll();
    res.status(200).json({ count: users.length, users });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    let { name, last_name, phone, email, password, role_idrole} = req.body;
    let user = new User( name, last_name, phone, email, password, role_idrole);

    console.log (user)

    user = await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateUserRole = async (req, res, next) => {
  try {
    let userId = req.params.id;
    let { role } = req.body;

    let user = new User(role, '', '', '', '', '');
    user = await user.updateUserRoleById(userId);

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateUserPass = async (req, res, next) => {
  try {
    let userId = req.params.id;
    let {password} = req.body;

    let user = new User('', '', '', '', '', password);
    user = await user.updateUserPassById(userId);

    res.status(200).json({message: 'User updated successfully', user});
  } catch (error) {
    console.log(error);
    next(error);
  }
}

exports.updateUserEmail = async (req, res, next) => {
  try {
    let userId = req.params.id;
    let {email} = req.body;

    let user = new User('', '', '', '', email, '');
    console.log(user)
    user = await user.updateUserEmailById(userId);

    res.status(200).json({message: 'User updated successfully', user});
  } catch (error) {
    console.log(error);
    next(error);
  }
}

exports.updateUserPhone = async (req, res, next) => {
  try {
    let userId = req.params.id;
    let {phone} = req.body;

    let user = new User('', '', '', phone, '', '');
    user = await user.updateUserPhoneById(userId);

    res.status(200).json({message: 'User updated successfully', user});
  } catch (error) {
    console.log(error);
    next(error);
  }
}

exports.getSingleUser = async (req, res, next) => {
  try {
    let userId = req.params.id;
    let [user, _] = await User.findById(userId);
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteUser = (req, res, next) => {
  let user;
  try {
    user = User.deleteById(req.params.id);
    res.status(200).json({ message: 'User deleted successfully', user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
