import { alarmAPI } from "./alarmAPI";

const express = require("express");
const router = express.Router();

router.get("/api/alarm", [], alarmAPI.get);
router.put("/api/alarm", [], alarmAPI.change);

module.exports = router;
