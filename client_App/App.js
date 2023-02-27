import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import TabNavigation from "./src/navigation/TabNavigation";

export default function App() {
  return (
    <SafeAreaView className="flex-1 mt-12">
      <StatusBar style="auto" />
      <TabNavigation />
    </SafeAreaView>
  );
}
