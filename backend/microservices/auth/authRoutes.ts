import { authAPI } from "./authAPI";

const express = require("express");
const router = express.Router();

const { check } = require("express-validator");

router.post(
	"/api/login",
	[
		check("login", "Некоректный логин").isLength({ min: 1, max: 30 }),
		check("password", "Некоректный пароль").isLength({ min: 8, max: 30 }),
	],
	authAPI.login
);

router.put(
	"/api/password",
	[
		check("passwordnow", "Некоректный текущий пароль").isLength({
			min: 8,
			max: 30,
		}),
		check("passwordnew", "Некоректный новый пароль").isLength({
			min: 8,
			max: 30,
		}),
	],
	authAPI.changePass
);

module.exports = router;
