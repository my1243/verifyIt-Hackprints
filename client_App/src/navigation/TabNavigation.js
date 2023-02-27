import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import ScannerScreen from "../screens/ScannerScreen";
import Login from "../components/Auth/Login";
import VerificationScreen from "../screens/VerificationScreen";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Authentication"
      >
        <Tab.Screen
          name="Authentication"
          options={{
            tabBarShowLabel: false,
            tabBarButton: () => null,
          }}
          component={Login}
        />
        <Tab.Screen
          name="HomeScreen"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, focused }) => (
              <MaterialIcons
                type={"Home"}
                name={focused ? "home" : "home"}
                color={focused ? "#2766ED" : "#000"}
                size={30}
              />
            ),
            tabBarStyle: {
              height: 64,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
          }}
          component={HomeScreen}
        />
        <Tab.Screen
          name="ScannerScreen"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, focused }) => (
              <MaterialIcons
                type={"Scanner"}
                name={focused ? "qr-code-scanner" : "qr-code-scanner"}
                color={focused ? "#2766ED" : "#000"}
                size={28}
                style={{
                  backgroundColor: "#6c95ed",
                  padding: 10,
                  borderRadius: 100,
                  color: "white",
                }}
                className="p-2"
              />
            ),
            tabBarStyle: {
              height: 64,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
          }}
          component={ScannerScreen}
        />

        <Tab.Screen
          name="VerificationScreen"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, focused }) => (
              <Feather
                type={"User"}
                name={focused ? "user" : "user"}
                color={focused ? "#2766ED" : "#000"}
                size={28}
              />
            ),
            tabBarStyle: {
              height: 64,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
          }}
          component={VerificationScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigation;
