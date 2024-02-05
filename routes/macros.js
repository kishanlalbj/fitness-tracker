const createHttpError = require("http-errors");
const verifyJWT = require("../middlewares/verifyJWT");
const User = require("../models/User");
const { calculateAge, calculateMaintanenceCalorie } = require("./utils");

const router = require("express").Router();
router.post("/", verifyJWT, async (req, res, next) => {
  try {
    const { weight } = req.body;
    const user = req.user;

    if (!weight) throw createHttpError.BadRequest("Weight is required");

    const { height, dateOfBirth } = await User.findById(user.id)
      .select({
        height: 1,
        dateOfBirth: 1
      })
      .lean();

    const age = calculateAge(dateOfBirth);

    const mc = calculateMaintanenceCalorie(weight, height, age);

    if (mc) res.send({ mc });
    else
      throw createHttpError.InternalServerError(
        "Something went wrong, please try again later"
      );
  } catch (error) {
    next(error);
  }
});

module.exports = router;
