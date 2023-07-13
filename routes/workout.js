const verifyJWT = require("../middlewares/verifyJWT");

const router = require("express").Router();

router.post("/workouts", verifyJWT, async(req, res));
