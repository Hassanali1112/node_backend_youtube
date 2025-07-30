import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResonse } from "../utils/ApiResponse.js"





// Access and refresh token generator
const generateAccessAndRefreshToken = async (userId) =>{

  try {

    const user = await User.findById(userId)

    const accessToken = await user.generateAccessToken()
    const refreshToken = await user.generateRefreshToken()

    user.refreshToken = refreshToken;
   await user.save({
    validateBeforeSave : false
   })

   return {
    accessToken, refreshToken
   }
    
  } catch (error) {
    
  }
}


export const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, fullName, password } = req.body;

  if (
    [userName, email, fullName, password].some((field) => field.trim() === "" )
  ) {
    throw new ApiError(400, "All fields are required !");
    // res.status(400).json("all fields are required")
  }

  const userFound = await User.findOne({
    $or: [{ userName }, { email }],
  });
  


  if (userFound) {
    throw new ApiError(409, "User with this email or user name already exits!");
  }

  const avatarLocalfilePath = req.files?.avatar[0]?.path;
  

  if (!avatarLocalfilePath) {
    throw new ApiError(400, "Avatar 1 file is required");
  }


  const avatar = await uploadToCloudinary(avatarLocalfilePath);
  // console.log("avatar file",avatar)

  if (!avatar) {
    throw new ApiError(400, "Avatar 2 file is required !");
  }

  let coverImageLocalfilePath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalfilePath = req.files?.coverImage[0].path;
  }

  let coverImage;
  if (coverImageLocalfilePath) {
     coverImage = await uploadToCloudinary(coverImageLocalfilePath);
  }

 const newUser = await User.create({
   fullName,
   email,
   avatar: avatar.url,
   coverImage: coverImage?.url || "",
   password,
   userName: userName.toLowerCase(),
 });

 const newlyCreatedUser = await User.findById(newUser._id).select(
   "-password -refreshToken"
 );

 if(!newlyCreatedUser){
  throw new ApiError(500, "Something went wrong while user Registering!")
 }

 return res.status(201).json( new ApiResonse(200, newlyCreatedUser, "user created successfully"))

});

export const loginUser = asyncHandler( async (req, res)=>{
  const {userName, email, password } = req.body
  console.log(req.body)

  if( !(userName || email) ){
    throw new ApiError(400, "user name or email is required !")
  }

  const foundUser = await User.findOne(
    {
      $or : [{userName}, {email}]
    }
  )

  if( !foundUser ){
    throw new ApiError(404, "user not found with this username or email")
  }

  const isPasswordValid = await foundUser.isPasswordCorrect(password)

  console.log("password validation", isPasswordValid)

  if(!isPasswordValid){
    throw new ApiError(401, "Invalid user credentials !")
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(foundUser._id)

  const logedinUser = await User.findById(foundUser._id).select("-password -refreshToken")

  const options = {
    httpOnly : true,
    secure : true,
  }

  return res.status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(
    new ApiResonse(200, {
      user : logedinUser,
      accessToken : accessToken,
      refreshToken : refreshToken,
    },
    "user loged in successfully"
  )
  )
})
