import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
// import dotenv from "dotenv"

// dotenv.config()

// console.log(process.env.ACCESS_TOKEN_EXPIRY)

const UserSchema = new Schema({
  userName : {
    type : String,
    required : true,
    unique : true,
    lowercase : true,
    trim : true,
    index : true
  },
  email : {
    type : String,
    required : true,
    unique : true,
    lowercase : true,
    trim : true
  },
  fullName : {
    type : String,
    required : true,
    trim : true,
    index : true,
  },
  avatar : {
    type : String,
    required : true,
  },
  coverImage : {
    type : String
  },
  watchHistory : {
    type : Schema.Types.ObjectId,
    ref : "Video"
  },
  password : {
    type : String,
    required : true,
  },
  refreshToken : {
    type : String
  }

},
  {
    timestamps : true,
  })

UserSchema.pre("save", async function(next){
  
  if (!this.isModified("password")) return;
  
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

UserSchema.methods.isPasswordCorrect = async function (password){
 return await bcrypt.compare(password, this.password)
}

UserSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      userName: this.userName,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
}

UserSchema.methods.generateRefreshToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

  export const User = mongoose.model("User", UserSchema)

