import React, { useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <SafeAreaView style={styles.splashScreen}>
      <Text style={styles.maaura}>MindVelocity</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  maaura: {
    fontSize: 32,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
    color: "#000",
    textAlign: "center",
  },
  splashScreen: {
    backgroundColor: "#fff",
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SplashScreen;
