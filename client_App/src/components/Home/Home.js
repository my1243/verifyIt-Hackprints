import { View, Text } from "react-native";
import React from "react";
import Navbar from "./Navbar";
import ScheduleCard from "./ScheduleCard";

const Home = () => {
  return (
    <View className="mx-3">
      <Navbar />
      <View className="mt-5">
        <Text className="text-xl">Todays's Schedule</Text>
      </View>
      <ScheduleCard />
    </View>
  );
};

export default Home;
