import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Scanner from "../components/BarCode/Scanner";
import StudentDetails from "../components/BarCode/StudentDetails";

const Stack = createStackNavigator();

const ScannerScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Scanner"
    >
      <Stack.Screen name="Scanner" component={Scanner} />
      <Stack.Screen name="StudentDetails" component={StudentDetails} />
    </Stack.Navigator>
  );
};

export default ScannerScreen;
