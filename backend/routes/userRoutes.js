const express = require('express');
const userControllers = require('../controllers/userControllers');
const router = express.Router();

// route GET && POST - /users
router.route('/')
    .get(userControllers.getAllUsers)
    .post(userControllers.createUser);

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