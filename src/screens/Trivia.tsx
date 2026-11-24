import { useState } from "react";
import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types";
import { questions } from "../data/questions";

type Props = NativeStackScreenProps<RootStackParamList, "Trivia">;

export default function Trivia({ navigation }: Props) {
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

  function getOptionState(option: string) {
    if (!hasAnswered) return null;
    if (option === currentQuestion.answer) return "correct";
    if (option === selectedOption) return "incorrect";
    return "dimmed";
  }

  return (
    <SafeAreaView style={styles.safe} edges={["bottom"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.progress}>
          Question {currentIndex + 1} of {questions.length}
        </Text>
        <Text style={styles.question} accessibilityRole="header">
          {currentQuestion.question}
        </Text>

        <View style={styles.options}>
          {currentQuestion.options.map((option) => {
            const state = getOptionState(option);
            return (
              <Pressable
                key={option}
                style={({ pressed }) => [
                  styles.option,
                  pressed && styles.pressed,
                  state && styles[state],
                ]}
                onPress={() => handleSelect(option)}
                disabled={hasAnswered}
                accessibilityRole="button"
                accessibilityState={{
                  disabled: hasAnswered,
                  selected: option === selectedOption,
                }}
              >
                <Text style={styles.optionText}>{option}</Text>
                {/* text label so right/wrong isn't conveyed by color alone */}
                {state === "correct" && <Text style={styles.correctTag}>Correct</Text>}
                {state === "incorrect" && <Text style={styles.incorrectTag}>Your answer</Text>}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* footer always reserves its space, so options don't jump when Next appears */}
      <View style={styles.footer}>
        <Pressable
          style={({ pressed }) => [
            styles.nextButton,
            !hasAnswered && styles.hidden,
            pressed && styles.nextPressed,
          ]}
          onPress={handleNext}
          disabled={!hasAnswered}
          accessibilityElementsHidden={!hasAnswered}
          importantForAccessibility={hasAnswered ? "auto" : "no-hide-descendants"}
        >
          <Text style={styles.nextButtonText}>
            {isLastQuestion ? "See Results" : "Next Question"}
          </Text>
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
    flexGrow: 1,
    width: "100%",
    maxWidth: 640, // keeps line length comfortable on tablets
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  progress: {
    fontSize: 15,
    fontWeight: "600",
    color: "#5C5C5C",
    fontVariant: ["tabular-nums"],
    marginBottom: 12,
  },
  question: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "700",
    color: "#111",
    letterSpacing: -0.3,
    marginBottom: 32,
  },
  options: {
    gap: 12,
  },
  option: {
    minHeight: 60,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1.5,
    borderColor: "#D4D4D4",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 18,
    backgroundColor: "#fff",
  },
  pressed: {
    backgroundColor: "#F2F2F2",
  },
  correct: {
    backgroundColor: "#E6F4EA",
    borderColor: "#1E8E3E",
  },
  incorrect: {
    backgroundColor: "#FCE8E8",
    borderColor: "#C5221F",
  },
  dimmed: {
    opacity: 0.55,
  },
  optionText: {
    flex: 1,
    fontSize: 19,
    lineHeight: 26,
    fontWeight: "500",
    color: "#111",
  },
  correctTag: {
    fontSize: 14,
    fontWeight: "700",
    color: "#137333",
  },
  incorrectTag: {
    fontSize: 14,
    fontWeight: "700",
    color: "#A50E0E",
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
    width: "100%",
    maxWidth: 640,
    alignSelf: "center",
  },
  nextButton: {
    backgroundColor: "#007AFF",
    minHeight: 54,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  nextPressed: {
    opacity: 0.85,
  },
  hidden: {
    opacity: 0,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});
