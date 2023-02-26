import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ScheduleCard = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="my-3"
      onPress={() => {
        navigation.navigate("ScheduleDetails");
      }}
    >
      <View className="bg-[#FCEBDC] p-2 rounded-xl border-l-8 border-[#E27A1A] pl-6">
        <Text className="text-[#E27A1A] font-bold text-lg">AJT Exam</Text>
        <Text className="text-[#EEAB6D] text-base">Block No. : 12</Text>
        <View className="flex flex-row items-center space-x-3">
          <Feather name="clock" size={18} color="#dd8d43" />
          <Text className="text-[#dd8d43] text-sm ">09.00 - 10.00</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ScheduleCard;
