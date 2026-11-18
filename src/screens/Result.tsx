import { StyleSheet, View, Text } from "react-native";

export default function Result() {
  return (
    <View style={styles.container}>
      <Text>Result Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
