const createHttpError = require("http-errors");
const { generateAccessToken } = require("../middlewares");
const verifyJWT = require("../middlewares/verifyJWT");
const cache = require("../middlewares/cache");
const User = require("../models/User");

const router = require("express").Router();

/**
 * @method post
 * @access public
 *
 */
router.post("/register", async (req, res, next) => {
  try {
    const { username, password, dateOfBirth, height } = req.body;

    if (!username || !password || !dateOfBirth || !height)
      throw createHttpError.BadRequest("All fields requried");
    const user = await User.findOne({ username }).lean();

    if (user) throw createHttpError.Conflict("Username taken");

    const newUser = new User({
      username,
      password,
      dateOfBirth,
      height
    });

    await newUser.save();

    res.status(201).send();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/**
 * @method post
 * @access public
 *
 */
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      throw createHttpError.BadRequest("all fields requried");

    const user = await User.findOne({ username });

    if (!user) throw createHttpError.NotFound("Username Not Found");

    const isMatch = await user.isValidPassword(password);
    if (!isMatch)
      throw createHttpError.Unauthorized("Username or password incorrect");

    const token = await generateAccessToken({
      id: user._id,
      username: user.username
    });

    const refreshToken = await generateAccessToken({
      id: user._id,
      username: user.username
    });
    res.cookie("rtk", refreshToken, { httpOnly: true });

    res.status(200).send({ token });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/logout", verifyJWT, async (req, res, next) => {
  try {
    const { user } = req;

    const userDetail = await User.findById(user.id).lean();

    if (!userDetail) throw createHttpError.NotFound("User not found");

    res.clearCookie("rtk");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/profile", cache, verifyJWT, async (req, res, next) => {
  try {
    const { user } = req;

    const userDetails = await User.findById(user.id).select({
      username: 1,
      height: 1,
      dateOfBirth: 1
    });

    res.send(userDetails);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
