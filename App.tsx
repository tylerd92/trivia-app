import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/screens/Home";
import Quiz from "./src/screens/Quiz";
import Results from "./src/screens/Results";
import type { RootStackParamList } from "./src/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Quiz' component={Quiz} />
          <Stack.Screen name='Results' component={Results} />
        </Stack.Navigator>
        <StatusBar style='auto' />
      </NavigationContainer>
    </>
  );
}
