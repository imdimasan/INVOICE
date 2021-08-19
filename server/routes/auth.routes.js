const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = Router();

// REGISTRATION /api/auth/register
router.post(
  "/register",
  [
    check("email", "[ERR-01] Непраивльный email").isEmail(),
    check("password", "[ERR-02] Минимальная длина минимум 6 символов").isLength(
      {
        min: 6,
      }
    ),
  ],
  async (req, res) => {
    try {
      //Валидация полей ввода
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "[ERR-00] Ошибка регистрации",
        });
      }

      const {
        email,
        password,
        organization,
        unp,
        bankaccount,
        bankname,
        legaladdress,
        bic,
      } = req.body;
      const candidate = await User.findOne({ email });
      const hashedPassword = await bcrypt.hash(password, 12);

      // Поиск совпадений в БД
      if (candidate) {
        return res
          .status(400)
          .json({ usererr: "[ERR-01] Такой пользователь уже создан" });
      }

      // Создание пользователя в БД
      const user = new User({
        email,
        password: hashedPassword,
        organization,
        unp,
        legaladdress,
        bankaccount,
        bankname,
        bic,
      });
      await user.save();
      res.status(201).json({ message: "[OK] Пользователь зарегистрирован" });
    } catch (error) {
      res.status(500).json({ message: "[ERR-00] Ошибка сервера ..." });
    }
  }
);

// LOGIN /api/auth/login
router.post(
  "/login",
  [
    check("email", "[ERR-01] Введте корректный email")
      .normalizeEmail()
      .isEmail(),
    check("password", "[ERR-02] Введите пароль").exists(),
  ],
  async (req, res) => {
    try {
      //Валидация полей ввода
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "[ERR-00] Ошибка авторизации",
        });
      }

      const { email, password } = req.body;

      // Проверка наличия записи пользователя в БД
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ message: "[ERR-01] Пользователь не найден" });
      }

      // Проверка пароля в поле ввода и БД
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "[ERR-02] Неверный пароль" });
      }

      // Авторизация
      const token = jwt.sign({ userId: user.id }, config.get("secret"), {
        expiresIn: "1h",
      });
      res.json({ token, userId: user.id });
    } catch (error) {
      res.status(500).json({ message: "[ERR-00] Ошибка сервера ..." });
    }
  }
);

module.exports = router;
