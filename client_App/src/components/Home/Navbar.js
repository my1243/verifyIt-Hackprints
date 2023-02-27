import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Navbar = () => {
  const [facultyData, setFacultyData] = useState();

  const handleName = async () => {
    setFacultyData(await AsyncStorage.getItem("fShortName"));
  };

  useEffect(() => {
    handleName();
  }, []);

  return (
    <View>
      <View className=" p-2 rounded-xl mx-3 my-2">
        <Text className="text-2xl text-white font-bold">
          Prof. {facultyData?.toUpperCase()}
        </Text>
        <Text className="text-base text-white font-bold">Let's Start </Text>
      </View>
    </View>
  );
};

export default Navbar;
