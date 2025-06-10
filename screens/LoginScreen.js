import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { auth, GoogleSignin } from '../config/firebase';

export default ({ navigation, setIsLoggedIn }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      console.log("User signed up:", userCredential.user.uid);
      setIsLoggedIn(true);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      console.log("User logged in:", userCredential.user.uid);
      setIsLoggedIn(true);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const userCredential = await auth().signInWithCredential(googleCredential);
      console.log("User signed in with Google:", userCredential.user.uid);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

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
        keyboardShouldPersistTaps="handled"
      >
        {/* Background container */}
        <View
          style={{
            alignItems: "center",
            paddingVertical: 100,
            paddingHorizontal: 32,
            backgroundColor: "#ffffff",
            position: "relative",
          }}
        >
          {/* Light top layer for subtle gradient effect */}
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 150,
              backgroundColor: "#F8F9FB",
              zIndex: -1,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          />

          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#000000",
              marginBottom: 32,
              textAlign: "center",
            }}
          >
            MindVelocity
          </Text>

          {/* Tabs container */}
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#F3F0FF",
              borderRadius: 12,
              padding: 4,
              marginBottom: 40,
              width: "100%",
              maxWidth: 360,
            }}
          >
            {/* Login Tab */}
            <TouchableOpacity
              onPress={() => setActiveTab("login")}
              style={{
                flex: 1,
                alignItems: "center",
                backgroundColor: activeTab === "login" ? "#FFFFFF" : "transparent",
                borderRadius: 12,
                paddingVertical: 12,
                shadowColor: activeTab === "login" ? "#0000001A" : "transparent",
                shadowOpacity: activeTab === "login" ? 0.1 : 0,
                shadowOffset: { width: 0, height: 1 },
                shadowRadius: 3,
                elevation: activeTab === "login" ? 3 : 0,
              }}
            >
              <Text
                style={{
                  color: activeTab === "login" ? "#3A00FF" : "#8A8A8A",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Login
              </Text>
            </TouchableOpacity>

            {/* Signup Tab */}
            <TouchableOpacity
              onPress={() => setActiveTab("signup")}
              style={{
                flex: 1,
                alignItems: "center",
                backgroundColor: activeTab === "signup" ? "#FFFFFF" : "transparent",
                borderRadius: 12,
                paddingVertical: 12,
                shadowColor: activeTab === "signup" ? "#0000001A" : "transparent",
                shadowOpacity: activeTab === "signup" ? 0.1 : 0,
                shadowOffset: { width: 0, height: 1 },
                shadowRadius: 3,
                elevation: activeTab === "signup" ? 3 : 0,
              }}
            >
              <Text
                style={{
                  color: activeTab === "signup" ? "#3A00FF" : "#8A8A8A",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form inputs & buttons container */}
          <View style={{ width: "100%", maxWidth: 360 }}>
            {/* Email Input */}
            <View
              style={{
                backgroundColor: "#F8F9FB",
                borderColor: "#ECE6FF",
                borderRadius: 12,
                borderWidth: 1,
                marginBottom: 20,
                shadowColor: "#0000000D",
                shadowOpacity: 0.1,
                shadowOffset: { width: 0, height: 1 },
                shadowRadius: 2,
                elevation: 2,
                paddingHorizontal: 16,
              }}
            >
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={{
                  color: "#000000",
                  fontSize: 16,
                  height: 48,
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Password Input */}
            <View
              style={{
                backgroundColor: "#F8F9FB",
                borderColor: "#ECE6FF",
                borderRadius: 12,
                borderWidth: 1,
                marginBottom: activeTab === "login" ? 30 : 40,
                shadowColor: "#0000000D",
                shadowOpacity: 0.1,
                shadowOffset: { width: 0, height: 1 },
                shadowRadius: 2,
                elevation: 2,
                paddingHorizontal: 16,
              }}
            >
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{
                  color: "#000000",
                  fontSize: 16,
                  height: 48,
                }}
              />
            </View>

            {/* Login Button */}
            {activeTab === "login" && (
              <>
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    backgroundColor: "#3800F5",
                    borderRadius: 12,
                    paddingVertical: 16,
                    marginBottom: 20,
                    shadowColor: "#0000001A",
                    shadowOpacity: 0.1,
                    shadowOffset: { width: 0, height: 4 },
                    shadowRadius: 6,
                    elevation: 6,
                    opacity: loading ? 0.7 : 1,
                  }}
                  onPress={handleLogin}
                  disabled={loading}
                >
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    {loading ? "Loading..." : "Log In"}
                  </Text>
                </TouchableOpacity>

                <Text
                  style={{
                    color: "#3A00FF",
                    fontSize: 14,
                    marginBottom: 30,
                    textAlign: "center",
                  }}
                >
                  Forgot Password?
                </Text>

                {/* Separator */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 30,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      height: 1,
                      backgroundColor: "#F3F4F6",
                      marginRight: 12,
                    }}
                  />
                  <Text
                    style={{
                      color: "#9CA3AF",
                      fontSize: 14,
                      marginHorizontal: 8,
                    }}
                  >
                    or
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      height: 1,
                      backgroundColor: "#F3F4F6",
                      marginLeft: 12,
                    }}
                  />
                </View>

                {/* Login with Google Button */}
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#FFFFFF",
                    borderColor: "#ECE6FF",
                    borderRadius: 12,
                    borderWidth: 1,
                    paddingVertical: 14,
                    shadowColor: "#0000001A",
                    shadowOpacity: 0.1,
                    shadowOffset: { width: 0, height: 1 },
                    shadowRadius: 3,
                    elevation: 3,
                    opacity: loading ? 0.7 : 1,
                  }}
                  onPress={handleGoogleSignIn}
                  disabled={loading}
                >
                  <Image
                    source={{
                      uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/rEqCGMmILJ/757sq175_expires_30_days.png",
                    }}
                    resizeMode={"stretch"}
                    style={{
                      borderRadius: 12,
                      width: 18,
                      height: 18,
                      marginRight: 12,
                    }}
                  />
                  <Text
                    style={{
                      color: "#000000",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Log in with Google
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {/* Signup Button */}
            {activeTab === "signup" && (
              <>
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    backgroundColor: "#3800F5",
                    borderRadius: 12,
                    paddingVertical: 16,
                    marginTop: 10,
                    marginBottom: 20,
                    shadowColor: "#0000001A",
                    shadowOpacity: 0.1,
                    shadowOffset: { width: 0, height: 4 },
                    shadowRadius: 6,
                    elevation: 6,
                    opacity: loading ? 0.7 : 1,
                  }}
                  onPress={handleSignUp}
                  disabled={loading}
                >
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    {loading ? "Loading..." : "Sign Up"}
                  </Text>
                </TouchableOpacity>

                {/* Separator */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 30,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      height: 1,
                      backgroundColor: "#F3F4F6",
                      marginRight: 12,
                    }}
                  />
                  <Text
                    style={{
                      color: "#9CA3AF",
                      fontSize: 14,
                      marginHorizontal: 8,
                    }}
                  >
                    or
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      height: 1,
                      backgroundColor: "#F3F4F6",
                      marginLeft: 12,
                    }}
                  />
                </View>

                {/* Sign up with Google Button */}
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#FFFFFF",
                    borderColor: "#ECE6FF",
                    borderRadius: 12,
                    borderWidth: 1,
                    paddingVertical: 14,
                    shadowColor: "#0000001A",
                    shadowOpacity: 0.1,
                    shadowOffset: { width: 0, height: 1 },
                    shadowRadius: 3,
                    elevation: 3,
                    opacity: loading ? 0.7 : 1,
                  }}
                  onPress={handleGoogleSignIn}
                  disabled={loading}
                >
                  <Image
                    source={{
                      uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/rEqCGMmILJ/757sq175_expires_30_days.png",
                    }}
                    resizeMode={"stretch"}
                    style={{
                      borderRadius: 12,
                      width: 18,
                      height: 18,
                      marginRight: 12,
                    }}
                  />
                  <Text
                    style={{
                      color: "#000000",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Sign up with Google
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
