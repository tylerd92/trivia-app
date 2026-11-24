import { useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types";
import { questions } from "../data/questions";

type Props = NativeStackScreenProps<RootStackParamList, "Quiz">;

export default function Quiz({ navigation }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const hasAnswered = selectedOption !== null;

  function handleSelect(option: string) {
    if (hasAnswered) return; // lock in the first answer
    setSelectedOption(option);
    if (option === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    }
  }

  function handleNext() {
    if (isLastQuestion) {
      // replace (not navigate) so "back" from Results doesn't return to a finished quiz
      navigation.replace("Results", {
        score,
        totalQuestions: questions.length,
      });
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    setSelectedOption(null);
  }

  function getOptionStyle(option: string) {
    if (!hasAnswered) return styles.option;
    if (option === currentQuestion.answer) return [styles.option, styles.correct];
    if (option === selectedOption) return [styles.option, styles.incorrect];
    return [styles.option, styles.dimmed];
  }

  return (
    <View style={styles.container}>
      <Text style={styles.progress}>
        Question {currentIndex + 1} of {questions.length}
      </Text>
      <Text style={styles.question}>{currentQuestion.question}</Text>

      <View style={styles.options}>
        {currentQuestion.options.map((option) => (
          <Pressable
            key={option}
            style={getOptionStyle(option)}
            onPress={() => handleSelect(option)}
            disabled={hasAnswered}
          >
            <Text style={styles.optionText}>{option}</Text>
          </Pressable>
        ))}
      </View>

      {hasAnswered && (
        <Pressable style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {isLastQuestion ? "See Results" : "Next Question"}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    justifyContent: "center",
  },
  progress: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  question: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 24,
  },
  options: {
    gap: 12,
  },
  option: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  correct: {
    backgroundColor: "#d4edda",
    borderColor: "#28a745",
  },
  incorrect: {
    backgroundColor: "#f8d7da",
    borderColor: "#dc3545",
  },
  dimmed: {
    opacity: 0.5,
  },
  optionText: {
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    marginTop: 24,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
