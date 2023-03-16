const User = require('../models/User');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
// const config = require('../config/auth.config');

exports.getAllUsers = async (req, res, next) => {
  let users;
  try {
    let limit = req.params.limit;
    let param = req.params.param;

    [users, _] = await User.findAll(limit, param);
    res.status(200).json({ count: users.length, users });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getSingleUser = async (req, res, next) => {
  try {
    let userId = req.params.id;
    let [users, _] = await User.findById(userId);
    res.status(200).json({ count: users.length, users });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getUsersByName = async (req, res, next) => {
  try {
    let name = req.params.name;

    let [users, _] = await User.findByName(name);
    res.status(200).json({ count: users.length, users });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let [user, _] = await User.findByEmail(email);
    user = user[0];
    if (!user) {
      res.status(401).json({ message: 'User not found' });
    }
    if (user.password !== md5(password)) {
      res.status(401).json({ message: 'Incorrect password' });
    }

    req.session.token = jwt.sign(
      {
        id: user.id
      },
      process.env.SESSION_SECRET,
      {
        expiresIn: 86400, // 24 godziny
      }
    );

    if (user.password === md5(password) && user) {

      res.cookie(
        'token',
        req.session.token
      );

      res.status(200).json({
        message: 'User logged in successfully',
        user,
        token: req.session.token,
      });

      next()
    }

  } catch (error) {
    console.log(error);
    next(error);
  }
}

exports.signoutUser = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!",
    });
  } catch (err) {
    this.next(err);
  }
};

exports.createUser = async (req, res, next) => {
  let { name, last_name, phone, email, password } = req.body;
  let id;

  try {
    let user = new User( name, last_name, phone, email, md5(password));
    user = await user.save();
    res.status(201).json({ message: 'User created successfully', user });

  } catch (error) {
    console.log(error);
    next(error);
  }

  try {
    let [user, _] = await User.findByEmail(email);
    ({iduser: id} = user[0]);
  } catch (error) {
    console.log(error);
    next(error);
  }

  try {
    let [_] = await User.setUserHasRole(id);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateUserDataById = async (req, res, next) => {
  let { role, name, last_name, phone, email, edit_by } = req.body;

  try {
    let userId = req.params.id;

    let user = new User(name, last_name, phone, email, '', edit_by);

    user = await user.updateUserDataById(userId, edit_by, role);

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.log(error);
    next(error);
  }

  try {
    let userId = req.params.id;

    let [_] = await User.updateUserHasRole(userId, edit_by, role);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

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

exports.deleteUser = (req, res, next) => {
  let user;
  try {
    user = User.deleteByIdRole(req.params.id);
    user = User.deleteById(req.params.id);
    res.status(200).json({ message: 'User deleted successfully', user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
