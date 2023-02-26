import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleLogin = async () => {
    navigation.navigate("HomeScreen");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {!loading ? (
          <View className="mx-3 h-screen flex-1 ">
            <View className="mt-3 flex flex-row items-center">
              <Text className="text-xl text-black">Login</Text>
            </View>
            <View className="border-2 border-[#4a4a4a] mt-8 rounded-lg p-2 flex flex-row">
              <TextInput
                placeholder="Enter email address"
                className="text-black text-base tracking-widest"
                onChangeText={setEmail}
                value={email}
              />
            </View>
            <View className="border-2 border-[#4a4a4a] mt-5 rounded-lg p-2 flex flex-row">
              <TextInput
                placeholder="Enter password"
                className="text-black text-base tracking-widest"
                onChangeText={setPassword}
                value={password}
              />
            </View>
            <View className="mt-2 absolute bottom-10 w-full">
              <TouchableOpacity
                onPress={handleLogin}
                className="bg-[#2766ED] p-2 rounded   items-center"
              >
                <Text className="text-white text-base">LOGIN</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <View className="m-auto">
              <ActivityIndicator size="large" color="white" />
            </View>
          </>
        )}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
