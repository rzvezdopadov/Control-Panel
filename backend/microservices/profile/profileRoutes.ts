import { profileAPI } from "./profileAPI";

const express = require("express");
const router = express.Router();

router.get("/api/profile", [], profileAPI.get);
router.post("/api/profile", [], profileAPI.create);
router.put("/api/profile", [], profileAPI.change);
router.get("/api/profiles", [], profileAPI.getAll);

module.exports = router;
