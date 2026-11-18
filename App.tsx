import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/screens/Home";
import Quiz from "./src/screens/Quiz";
import Result from "./src/screens/Result";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Quiz' component={Quiz} />
          <Stack.Screen name='Result' component={Result} />
        </Stack.Navigator>
        <StatusBar style='auto' />
      </NavigationContainer>
    </>
  );
}
