import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { UserDto } from "../config/dto/dto.js";
import jwt from "jsonwebtoken";
import { UserdtoLogin } from "../config/dto/userDto.js";

export class UserService {
  async userRegistration(name, email, password) {
    const findemail = await User.findOne({ email });
    if (findemail) {
      throw new Error(`This ${email} already exist!`);
    }
    const hashcode = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashcode });

    const userx = new UserDto(user.name, user.email);
    return userx;
  }

  async Login(email, password) {
    const userEmail = await User.findOne({ email });
    if (!userEmail) {
      throw new Error("User with this email does not exist");
    }

    const pass = await bcrypt.compare(password, userEmail.password);
    if (!pass) {
      throw new Error("Password is wrong");
    }
    const token = jwt.sign({ id: userEmail._id }, process.env.MY_SECRET_KEY, {
      expiresIn: "3h",
    });

    return new UserdtoLogin(userEmail, token);
  }

  async getAllUsers() {
    const users = await User.find().select("-password");
    return users;
  }
  async getUserProfile(userid) {
    const user = await User.findById(userid).select("-password");
    if (!user) {
      throw new Error(`User with ${userid} does not exit`);
    }
    return user;
  }

  async updateProfile(userid, updateData) {
    const user = await User.findByIdAndUpdate(
      userid,
      { name: updateData.name, email: updateData.email },
      { new: true, runValidators: true },
    ).select("-password");
    if (!user) {
      throw new Error("User with id not found");
    }
    return user;
  }

  async deleteUser(userid) {
    const user = await User.findByIdAndDelete(userid, {
      new: true,
      runValidators: true,
    }).select("-password");

    if(!user){
      throw new Error("User does not exist!")
    }
   return user
  }
 
  }

