import { StyleSheet, View, Text, Pressable } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Results">;

function getMessage(percentage: number): string {
  if (percentage === 100) return "Perfect score! 🎉";
  if (percentage >= 80) return "Great job!";
  if (percentage >= 50) return "Not bad, keep practicing!";
  return "Better luck next time!";
}

export default function Results({ route, navigation }: Props) {
  // route.params is typed from RootStackParamList["Results"]
  const { score, totalQuestions } = route.params;
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Complete</Text>

      <Text style={styles.score}>
        {score} / {totalQuestions}
      </Text>
      <Text style={styles.percentage}>{percentage}% correct</Text>
      <Text style={styles.message}>{getMessage(percentage)}</Text>

      <Pressable
        style={styles.button}
        onPress={() => navigation.replace("Quiz")}
      >
        <Text style={styles.buttonText}>Play Again</Text>
      </Pressable>

      <Pressable
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.popToTop()}
      >
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>
          Back to Home
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  score: {
    fontSize: 56,
    fontWeight: "bold",
    color: "#007AFF",
  },
  percentage: {
    fontSize: 18,
    color: "#666",
    marginTop: 4,
  },
  message: {
    fontSize: 18,
    marginTop: 16,
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    marginTop: 12,
    width: "100%",
    maxWidth: 280,
    alignItems: "center",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButtonText: {
    color: "#007AFF",
  },
});
