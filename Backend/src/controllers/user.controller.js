import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

import { ApiResponse } from "../utils/ApiResponse.js"; // Corrected import path


const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  // Get user details from the request body
  const { username, email, fullName, password } = req.body;

  // 1. Validate input
  if (!username || username.trim() === "") {
    throw new ApiError(400, "Username is required");
  }
  if (!email || email.trim() === "") {
    throw new ApiError(400, "Email is required");
  }
  if (!fullName || fullName.trim() === "") {
    throw new ApiError(400, "Full name is required");
  }
  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  // 2. Check if user already exists
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // 3. Create user in the database
  const user = await User.create({
    fullName,
    email,
    password,
    username: username.toLowerCase(),
  });

  if (!user) {
    throw new ApiError("Something went wrong while registering the user", 500);
  }

  // 4. Return a clean response
  return res
    .status(201)
    .json(new ApiResponse(user, 201, "User registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  // 1. Get user credentials from the request body
  const { email, username, password } = req.body;

  // 2. Validate input
  if (!username && !email) {
    throw new ApiError(400, "Username or email is required");
  }

  // 3. Find user in the database by Username or Email
  const user = await User.findOne({
    $or: [{ username: username?.toLowerCase() }, { email: email?.toLowerCase() }],
  }).select("+password");

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  // 4. Check if password is correct
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  // 5. Generate access and refresh tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  // 6. Send tokens in response (and in cookies)
  const options = {
    httpOnly: true,

    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        {
          user,
          accessToken,
          refreshToken,
        },
        200,
        "User logged In Successfully"
      )
    );
});


const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(user, 200, "User details fetched successfully"));
});

export { registerUser, loginUser, getCurrentUser };

