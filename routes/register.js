const handleRegister = require("../controllers/registerController");
const registerIsValid = require("../middleware/checkValidation");

const router = require("express").Router();

router.route("/").post(registerIsValid(), handleRegister);

module.exports = router;
