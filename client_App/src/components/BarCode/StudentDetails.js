import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import axios from "../../api/axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
const StudentDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [studentData, setStudentData] = useState("");
  const { id } = route.params;

  const handleStudentDetails = async () => {
    const { data } = await axios.post(
      "/get-specific-student",
      { studentId: id.toUpperCase() },
      {
        method: "POST",
      }
    );
    // console.log(data);
    setStudentData(data);
  };

  const handleVerification = async () => {
    let facHallId = await AsyncStorage.getItem("hallId");
    let scheduleId = await AsyncStorage.getItem("scheduleId");
    let stuHallId = studentData.hall.toString();
    // let currTime = moment(new Date()).format("hh:mm:ss");
    let currTime = new Date();
    let currDate = moment(new Date()).format("DD-MM-YYYY");

    let startTime = await AsyncStorage.getItem("startTime");
    let endTime = await AsyncStorage.getItem("endTime");
    let date = await AsyncStorage.getItem("date");

    if (
      facHallId === stuHallId &&
      currDate === date &&
      moment(currTime).format("hh:mm:ss") >=
        moment(startTime).format("hh:mm:ss") &&
      moment(currTime).format("hh:mm:ss") <= moment(endTime).format("hh:mm:ss")
    ) {
      // const { data } = await axios.put(
      //   "/verifyStudent",
      //   {
      //     studentId: id.toUpperCase(),
      //     currTime: currTime,
      //     _id: scheduleId,
      //   },
      //   {
      //     method: "PUT",
      //   }
      // );
      // console.log(data);
      navigation.navigate("Scanner");
    } else {
      Alert.alert("Error");
    }
  };

  useEffect(() => {
    handleStudentDetails();
  }, []);

  return (
    <View className="mx-3">
      <View>
        <Text className="text-xl mt-5">Student Details</Text>
        <View className="bg-blue-100 p-2 my-2 rounded-md flex-row">
          <Text className="text-lg">Name :</Text>
          <Text className="text-lg"> {studentData.name}</Text>
        </View>
        <View className="bg-blue-100 p-2 my-2 rounded-md flex-row">
          <Text className="text-lg">ID :</Text>
          <Text className="text-lg"> {id}</Text>
        </View>
        <View className="bg-blue-100 p-2 my-2 rounded-md flex-row">
          <Text className="text-lg">Roll No. :</Text>
          <Text className="text-lg"> {studentData.rollNo}</Text>
        </View>
        <View className="bg-blue-100 p-2 my-2 rounded-md flex-row">
          <Text className="text-lg">Sem :</Text>
          <Text className="text-lg"> {studentData.semester}</Text>
        </View>
      </View>
      <TouchableOpacity className="flex flex-row space-x-5 mt-10 justify-center ">
        <TouchableOpacity onPress={handleVerification}>
          <Text className="text-xl w-32 bg-green-400  rounded-xl  p-2  text-white font-bold">
            Verify
          </Text>
        </TouchableOpacity>
        <Text className="text-xl w-32  bg-red-400 rounded-xl  p-2  text-white font-bold">
          Deny
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default StudentDetails;
