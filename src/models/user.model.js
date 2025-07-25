import mongoose,{Schema} from "mongoose";

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
  converImage : {
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

  export const User = mongoose.model("User", UserSchema)

