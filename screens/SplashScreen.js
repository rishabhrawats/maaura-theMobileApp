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
      <Text style={styles.maaura}>Maaura</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  maaura: {
    position: "absolute",
    marginLeft: -42.5,
    top: 388,
    left: "50%",
    fontSize: 24,
    letterSpacing: -0.2,
    lineHeight: 36,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
    color: "#000",
    textAlign: "center",
  },
  splashScreen: {
    backgroundColor: "#fff",
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
  },
});

export default SplashScreen;
