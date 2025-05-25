import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
          borderColor: "#CED4DA",
          borderRadius: 8,
          borderWidth: 2,
        }}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={["#F8F9FB", "#EBE7FA"]}
          style={styles.gradientContainer}
        >
          <Text style={styles.title}>Sign Up</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              placeholder="Enter your email"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#6B7280"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              placeholder="Enter your password"
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#6B7280"
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => alert("Account created!")}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          {/* Login button to navigate to LoginScreen */}
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Already have an account? Login</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 141,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#3A00FF",
    marginBottom: 40,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 24,
  },
  inputLabel: {
    color: "#000000",
    fontSize: 14,
    marginBottom: 6,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#F8F9FB",
    borderColor: "#ECE6FF",
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#000000",
    shadowColor: "#0000000D",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  button: {
    backgroundColor: "#3800F5",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 40,
    marginTop: 8,
    marginBottom: 18,
    shadowColor: "#0000001A",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    color: "#3A00FF",
    fontSize: 14,
    marginTop: 12,
    textAlign: "center",
  },
});
