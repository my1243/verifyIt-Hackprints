import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "../../api/axios";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ScheduleCard = ({ item }) => {
  const navigation = useNavigation();
  const [hall, setHall] = useState("");
  const [subject, setSubject] = useState("");

  const handleSubject = async () => {
    const { data } = await axios.post(
      "/get-specific-subject",
      { branch: item.branch, subject: item.subject },
      {
        method: "POST",
      }
    );
    setSubject(data);
  };
  const handleHall = async () => {
    const { data } = await axios.post(
      "/get-specific-hall",
      { _id: item.hall },
      {
        method: "POST",
      }
    );
    // console.log(data);
    await AsyncStorage.setItem("hallId", data._id);
    await AsyncStorage.setItem("startTime", item?.examStartTime);
    await AsyncStorage.setItem("endTime", item?.examEndTime);
    await AsyncStorage.setItem("date", item?.examDate);
    await AsyncStorage.setItem("scheduleId", item?._id);

    setHall(data);
  };

  useEffect(() => {
    handleHall();
    handleSubject();
  }, []);

  return (
    <TouchableOpacity
      className="my-3 mx-3"
      // onPress={() => {
      //   navigation.navigate("ScheduleDetails");
      // }}
    >
      <View className="bg-[#5868C7] p-2 rounded-xl border-l-8 border-[#ffffff] pl-6">
        <View className="flex flex-row justify-between">
          <Text className="text-[#ffffff] font-bold text-lg">
            {item.examName}
          </Text>
          <Text className="text-[#ffffff] font-bold text-lg mr-2">
            {subject.subjectName} - [{subject.subjectCode}]
          </Text>
        </View>
        <View className="flex flex-row items-center my-1 space-x-5">
          <Text className="text-[#ffffff] text-base">
            Block No. : {hall.hallNo}
          </Text>
        </View>
        <View className="flex flex-row items-center space-x-3 my-1">
          <Text className="text-[#ffffff] text-base ">
            {moment(item?.examStartTime).format("LT")} -{" "}
            {moment(item?.examEndTime).format("LT")}
          </Text>
        </View>
        <View className="flex flex-row items-center space-x-3">
          <Text className="text-[#ffffff] text-base ">Roll No.</Text>
          <Text className="text-[#ffffff] text-base ">
            {hall.rollNoRange?.startRollNo} - {hall.rollNoRange?.endRollNo}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ScheduleCard;
