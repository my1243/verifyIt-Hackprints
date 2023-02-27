import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../components/Home/Home";
import ScheduleDetails from "../components/Home/ScheduleDetails";

const Stack = createStackNavigator();

const HomeScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ScheduleDetails" component={ScheduleDetails} />
    </Stack.Navigator>
  );
};

export default HomeScreen;
