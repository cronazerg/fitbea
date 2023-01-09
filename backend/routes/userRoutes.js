const express = require('express');
const userControllers = require('../controllers/userControllers');
const router = express.Router();
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth');

// route GET && POST - /users
//add cookieJwtAuth to protect route
router.route('/')
    .get(cookieJwtAuth, userControllers.getAllUsers)
    .post(cookieJwtAuth, userControllers.createUser);

router.route('/login')
    .post(userControllers.loginUser);

router.route("/:id")
    .get(userControllers.getSingleUser)
    .delete(userControllers.deleteUser);

router.route("/role/:id")
    .put(userControllers.updateUserRole)

router.route("/pass/:id")
    .put(userControllers.updateUserPass)

router.route("/email/:id")
    .put(userControllers.updateUserEmail)

router.route("/phone/:id")
    .put(userControllers.updateUserPhone)

module.exports = router;