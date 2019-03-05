import React from "react";
import { createStackNavigator } from "react-navigation";

import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignupScreen";
import SignupDriverScreen from "../screens/auth/SignupDriverScreen";

import AuthLandingScreen from "../screens/auth/AuthLandingScreen";

export default createStackNavigator(
  {
    AuthLanding: AuthLandingScreen,
    Login: LoginScreen,
    Signup: SignupScreen,
    SignupDriver: SignupDriverScreen
  },
  {}
);
