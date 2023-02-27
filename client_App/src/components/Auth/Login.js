import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "../../api/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleLogin = async () => {
    setLoading(true);
    const { data } = await axios.post(
      "/get-specific-faculty",
      { fId: email },
      {
        method: "POST",
      }
    );
    await AsyncStorage.setItem("fShortName", data.fShortName);
    await AsyncStorage.setItem("fId", data.fId);
    // await AsyncStorage.setItem("fShortName", "FID-1");
    setLoading(false);

    navigation.navigate("HomeScreen");
  };
  return (
    <>
      <StatusBar backgroundColor="#00AEE5" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 bg-[#ffffff]"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {!loading ? (
            <ScrollView showsVerticalScrollIndicator={false} className="">
              <View className="bg-[#00AEE5] pb-10 rounded-b-3xl">
                <View className="flex bg-white rounded-full w-32 mx-auto h-32 flex-row mt-32 items-center shadow-xl justify-center ">
                  <Image
                    style={{
                      width: 85,
                      height: 85,
                    }}
                    source={require("../../assets/logo.png")}
                  />
                </View>
              </View>
              <View className=" mt-8 bg-blue-100   rounded-lg flex flex-row mx-3">
                <TextInput
                  placeholder="Enter email address"
                  className="text-blue-700  text-lg p-3 tracking-widest w-screen"
                  onChangeText={setEmail}
                  value={email}
                />
              </View>
              <View className="bg-blue-100  mt-5 rounded-lg p-3 flex flex-row mx-3">
                <TextInput
                  placeholder="Enter password"
                  className="text-blue-700  text-lg tracking-widest w-screen"
                  onChangeText={setPassword}
                  value={password}
                />
              </View>
              <View className="mt-2  w-full">
                <TouchableOpacity
                  onPress={handleLogin}
                  className="bg-blue-500 p-2 rounded   items-center mx-3 mt-44"
                >
                  <Text className="text-white text-lg">LOGIN</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          ) : (
            <>
              <View className="m-auto">
                <ActivityIndicator size="large" color="blue" />
              </View>
            </>
          )}
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default Login;
