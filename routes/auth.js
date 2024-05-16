// host + /api/auth
const { Router } = require("express");
const { check } = require("express-validator");
const { fieldValidate } = require("../middlewares/fieldValidate");
const router = Router();

const { register, login } = require("../controllers/auth");

router.post(
  "/register",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La contrasena debe ser al menos 6 caracteres").isLength({
      min: 6,
    }),
    fieldValidate,
  ],
  register
);

router.post(
  "/login",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La contrasena es obligatorio").not().isEmpty(),
    fieldValidate,
  ],
  login
);

module.exports = router;
