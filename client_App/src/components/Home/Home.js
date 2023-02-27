import { View, Text, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ScheduleCard from "./ScheduleCard";
import axios from "../../api/axios";

const Home = () => {
  const [examData, setExamData] = useState({});
  const handleSchedules = async () => {
    let facId = await AsyncStorage.getItem("fId");
    const { data } = await axios.post(
      "/get-specific-exam-by-fac-schedule",
      { fId: facId },
      {
        method: "POST",
      }
    );
    console.log(data);
    setExamData(data);
  };

  useEffect(() => {
    handleSchedules();
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#00AEE5" />
      <View className="">
        <View className="bg-[#00AEE5] rounded-2xl">
          <Navbar />
        </View>

        <View className="h-full pt-3 mt-5 rounded-t-2xl bg-[#c1c8f4]">
          {examData.map !== undefined &&
            examData.map((item, index) => (
              <ScheduleCard key={index} item={item} />
            ))}
        </View>
      </View>
    </>
  );
};

export default Home;
