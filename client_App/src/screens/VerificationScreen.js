import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import VerifiedStudent from "../components/Verification/VerifiedStudent";

const Stack = createStackNavigator();

const VerificationScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="VerifiedStudent" component={VerifiedStudent} />
    </Stack.Navigator>
  );
};

export default VerificationScreen;
