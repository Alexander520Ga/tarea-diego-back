const { response } = require("express");
const User = require("../models/User");

const register = async (req, res = response) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "Ya hay un usuario con ese correo",
      });
    }
    user = new User(req.body);

    await user.save();

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
    });
  } catch (error) {
    console.log("ERROR::", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el admin",
    });
  }
};

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario no existe",
      });
    }
    return res.status(200).json({
      ok: true,
      msg: "logeado",
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log("ERR: ", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el admin",
    });
  }
};
module.exports = { register, login };
