import { View, Text, StyleSheet } from "react-native";
export default function OrDivider() {
  return (
    <View style={styles.container}>
      <View style={styles.divider} />
      <Text>or</Text>
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
    width: 150,
    marginHorizontal: 10,
  },
});
