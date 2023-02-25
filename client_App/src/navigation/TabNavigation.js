import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Scanner from "../components/BarCode/Scanner";
import { MaterialIcons, Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="HomeScreen"
      >
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
          component={Scanner}
        />

        <Tab.Screen
          name="ProfileScreen"
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
          component={ProfileScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigation;
