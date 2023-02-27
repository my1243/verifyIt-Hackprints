import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";

const VerifiedCard = ({ item }) => {
  return (
    <TouchableOpacity className="my-3 mx-3">
      <View className="bg-[#dcebfc] p-2 rounded-xl border-l-8 border-[#1a7ee2] pl-6">
        <Text className="text-[#1a7ee2] font-bold text-lg">
          ID : {item.studentId}
        </Text>
        <Text className="text-[#ff7830] font-bold text-lg">
          Time : {moment(item.currentTime).format("hh:mm:ss")}
        </Text>
        <Text className="text-[#5d9b4a] font-bold text-lg">
          Status : {item.verified ? "Verified" : "Pending"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default VerifiedCard;
