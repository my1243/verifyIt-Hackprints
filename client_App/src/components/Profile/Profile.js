import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome, SimpleLineIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const navigation = useNavigation();

  return (
    <View>
      <View className="mx-5 mt-8">
        <View className="flex flex-row ">
          <View className="p-2 bg-[#9BE4D9] rounded-full w-16 items-center">
            <FontAwesome name="user-o" size={42} color="white" />
          </View>

          <View className="ml-8">
            <View className="flex flex-row justify-between items-center">
              <Text className="text-black text-xl">Harshil Sarariya</Text>
            </View>
          </View>
        </View>
        <View className="w-11/12 border-b-2 border-[#43424F] my-5 ml-8" />
        <TouchableOpacity className="flex flex-row items-center space-x-5 ml-3">
          <SimpleLineIcons name="settings" size={18} color="#000000" />
          <Text className="text-black text-base">Settings</Text>
        </TouchableOpacity>
        <View className="w-11/12 border-b-2 border-[#43424F] my-5 ml-8" />
        <TouchableOpacity className="flex flex-row items-center space-x-5 ml-3">
          <SimpleLineIcons name="logout" size={18} color="#000000" />
          <Text className="text-[#000000] text-base">Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
