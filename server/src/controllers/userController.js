import { User } from "../Models/userModel.js";
import { ApiError } from "../Utils/ApiError.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { sendEmail } from "../services/emailService.js";


const registerController = asyncHandler(async(req, res) => {
  const { fullName, username, email, password } = req.body;
  console.log('email', email);

  // 1. Validate mandatory text fields
  if ([fullName, username, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  // 2. Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ username }, { email }]
  });

  if (existingUser) {
    throw new ApiError(409, "User with this email or username already exists");
  }

  // 3. Handle Avatar File (FIXED: Safe optional check using optional chaining)
  const avatarLocalPath = req.files?.avatar?.[0]?.path || null; 
  // Note: If you are uploading to Cloudinary, pass avatarLocalPath to your 
  // upload utility here, and save the resulting secure_url instead.


  const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
  console.log(`Generated OTP for ${email}:`, generatedOtp);

  // 4. Save to Database
  const newUser = await User.create({
    fullName,
    username,
    email,
    password, // Ensure your schema has a pre-save hook to hash this!
    avatar: avatarLocalPath, // Saves the path if exists, or null if empty
    OTP: generatedOtp, // Save the generated OTP to the database,
    isVerified: false, // Set default verification status
  });

  // 5. Verify the user was created successfully
  if (!newUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // 6. Return successful response
  return res.status(201).json({
    success: true,
    data: newUser,
    message: "User registered successfully"
  });
});


const otpVerificationController = async(req, res)=> {
    const {email, otp} = req.body;

    console.log(email, otp);
    
    if(!email || !otp) {
      throw new ApiError(400, "All fields are required")
    }

    const user = await User.findOne({email});

    if(!user){
      throw new ApiError(400, "User not found");
    }
    console.log(otp, user.OTP)

    if(user.OTP !== otp) {
      throw new ApiError(400, "Incorrect OTP");
    }

    // Updating database fields

    user.OTP = null;
    user.isVerified = true;
    await user.save()

    res.status(200).json({status: "success", message:"OTP verified successfully"})
  }


export {registerController,
  otpVerificationController
};