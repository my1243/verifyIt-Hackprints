import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import VerifiedCard from "./VerifiedCard";

const VerifiedStudent = () => {
  const [verifiedStudents, setVerifiedStudents] = useState([]);

  const fetchVerifiedStudent = async () => {
    let scheduleId = await AsyncStorage.getItem("scheduleId");

    const { data } = await axios.post(
      "/getVerifiedStudent",
      { _id: scheduleId },
      {
        method: "POST",
      }
    );
    setVerifiedStudents(data);
    console.log(verifiedStudents);
  };

  useEffect(() => {
    fetchVerifiedStudent();
  }, []);

  return (
    <ScrollView>
      <View className="mx-3 bg-[#00AEE5] rounded-2xl h-16">
        <Text className=" mx-3 text-2xl mt-3 text-white font-bold ">
          Verified Students
        </Text>
      </View>

      {verifiedStudents.map !== undefined &&
        verifiedStudents.map((item, index) => (
          <VerifiedCard item={item} key={index} />
        ))}
    </ScrollView>
  );
};

export default VerifiedStudent;
