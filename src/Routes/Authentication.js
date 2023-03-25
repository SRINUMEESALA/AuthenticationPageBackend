import express from "express";
const AuthenticationRoute = express.Router();
import User from "../Models/Users.js";
import jwt from "jsonwebtoken";

const verifylogin = async (request, response) => {
  const userData = request.body;
  console.log("Accessed Login API");
  try {
    const isValidUser = await User.findOne({
      email: userData.email,
      password: userData.password,
    });

    if (isValidUser !== null) {
      let jwtToken = jwt.sign({ email: userData.email }, "krishnaCode");
      response.status(200);
      response.send({ mgs: "User exists", jwtToken });
    } else {
      response.status(401);
      response.send({ mgs: "No user found" });
    }
  } catch (error) {
    console.log(error);
    response.status(500);
    response.send({ mgs: "Something went wrong!" });
  }
};

const registerUser = async (request, response) => {
  const userData = request.body;
  console.log("Accessed Register API");
  try {
    const registrationStatus = await User.insertMany([userData]);
    let creationId = registrationStatus[0]._id.valueOf();
    console.log(registrationStatus);
    // console.log(creationId);
    response.status(200);
    response.send({ mgs: "User created Successfully", creationId });
  } catch (error) {
    console.log(error);
    response.status(500);
    response.send({ mgs: "Something went wrong!" });
  }
};

const resetPassword = async (request, response) => {
  const forgotPassword = JSON.parse(request.query.forgotPassword);

  const userData = request.body;
  console.log("Accessed Forgot password API");
  try {
    switch (true) {
      case forgotPassword:
        const updateStatus = await User.updateOne(
          { email: userData.email },
          { password: userData.newPassword }
        );
        // console.log(updateStatus, userData);
        if (updateStatus.acknowledged) {
          response.status(200);
          response.send({ mgs: "Password updated Successfully" });
        } else {
          response.status(400);
          response.send({ mgs: "Password updation failed" });
        }

        break;

      default:
        break;
    }
  } catch (error) {
    console.log(error);
    response.status(500);
    response.send({ mgs: "Something went wrong!" });
  }
};

AuthenticationRoute.post("/login", verifylogin);
AuthenticationRoute.post("/register", registerUser);
AuthenticationRoute.post("/user", resetPassword);

export default AuthenticationRoute;
