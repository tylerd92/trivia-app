import { StyleSheet, View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types";
import { questions } from "../data/questions";

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function Home() {
  const navigation = useNavigation<HomeNavigationProp>();
  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <View style={styles.content}>
        <Text style={styles.title} accessibilityRole="header">
          Trivia
        </Text>
        <Text style={styles.tagline}>Test your general knowledge.</Text>
        <Text style={styles.meta}>
          {questions.length} questions · Multiple choice
        </Text>
      </View>

      <View style={styles.footer}>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          onPress={() => navigation.navigate("Trivia")}
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>Start Quiz</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: "20%", // sits in the upper-middle, not dead center
    paddingHorizontal: 24,
    width: "100%",
    maxWidth: 640,
    alignSelf: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    color: "#111",
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 18,
    lineHeight: 26,
    color: "#5C5C5C",
    marginBottom: 20,
  },
  meta: {
    fontSize: 15,
    fontWeight: "600",
    color: "#5C5C5C",
    fontVariant: ["tabular-nums"],
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
    width: "100%",
    maxWidth: 640,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    minHeight: 54,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  pressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});
