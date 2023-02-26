import { View, Text } from "react-native";
import React from "react";
import Navbar from "../Home/Navbar";
import { useRoute } from "@react-navigation/native";

const StudentDetails = () => {
  const route = useRoute();

  const { id } = route.params;

  return (
    <View className="mx-3">
      <Navbar />
      <View>
        <Text className="text-xl mt-5">Student Details</Text>
        <Text>{id}</Text>
      </View>
    </View>
  );
};

export default StudentDetails;
