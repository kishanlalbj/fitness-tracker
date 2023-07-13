const createHttpError = require("http-errors");
const verifyJWT = require("../middlewares/verifyJWT");
const Metric = require("../models/Metrics");
const User = require("../models/User");
const { findBMIRange, findBodyFatRange } = require("../utils/metricResults");
const {
  calculateBMI,
  calculateBodyFat,
  calculateBMR,
  calculateAge,
  calculateBMIResult
} = require("./utils");

const router = require("express").Router();

router.post("/", verifyJWT, async (req, res, next) => {
  try {
    const { date, weight, neck, waist } = req.body;

    const user = req.user;

    if (!date || !weight || !neck || !waist)
      throw createHttpError.BadRequest("All fields required");

    const { height, dateOfBirth } = await User.findById(user.id)
      .select({ height: 1, dateOfBirth: 1 })
      .lean();

    const age = calculateAge(dateOfBirth);
    const bmi = calculateBMI(weight, height);
    const bodyFat = calculateBodyFat(height, waist, neck);
    const bmr = calculateBMR(height, weight, age);
    const bmiResult = calculateBMIResult(bmi);

    const metric = new Metric({
      user: user.id,
      date,
      weight,
      neck,
      waist,
      bmi: bmi,
      bodyFat: bodyFat,
      bmr: bmr
    });

    const saved = await metric.save();

    res.status(201).json(saved);
  } catch (error) {
    console.log(error);
    next(createHttpError(error));
  }
});

router.get("/", verifyJWT, async (req, res, next) => {
  try {
    const user = req.user;

    const metrics = await Metric.find({ user: user.id }).lean();

    res.send(metrics[metrics.length - 1]);
  } catch (error) {
    next(error);
  }
});

router.get("/chart", verifyJWT, async (req, res, next) => {
  try {
    const user = req.user;

    const metrics = await Metric.find({ user: user.id })
      .select("date bmi bmr bodyFat weight waist")
      .sort({ date: -1 })
      .lean();

    if (metrics.length > 0) {
      metrics[0].bmiRange = findBMIRange(metrics[0].bmi);
      metrics[0].bfRange = findBodyFatRange(metrics[0].bodyFat);
    }

    res.send(metrics);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
