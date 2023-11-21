import { profileAPI } from "./profileAPI";

const express = require("express");
const router = express.Router();

router.get("/api/profile", [], profileAPI.get);
router.post("/api/profile", [], profileAPI.create);
router.put("/api/profile", [], profileAPI.change);

module.exports = router;
