import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { WebView } from "react-native-webview"; // Import WebView for embedding YouTube video

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true); // State to track if welcome screen is visible
  const [showHome, setShowHome] = useState(false); // State to track if homepage is visible

  // Effect to hide the welcome message after 3 seconds
  useEffect(() => {
    if (showWelcome) {
      setTimeout(() => {
        setShowWelcome(false);
        setShowHome(true); // Show the home screen after the welcome screen disappears
      }, 3000); // 3000ms = 3 seconds
    }
  }, [showWelcome]);

  return (
    <View style={styles.container}>
      {/* Welcome Screen */}
      {showWelcome && (
        <View style={styles.welcomeScreen}>
          <Text style={styles.welcomeText}>Welcome to Mind Velocity</Text>
        </View>
      )}

      {/* Home Screen */}
      {showHome && (
        <View style={styles.homeScreen}>
          <Text style={styles.homeHeading}>Home Page</Text>
          
          {/* Video Section */}
          <View style={styles.videoContainer}>
            <Text style={styles.videoHeading}>Your Video Starts Here</Text>
            {/* WebView to embed YouTube video */}
            <WebView
              source={{ uri: 'https://www.youtube.com/embed/eHJnEHyyN1Y' }}  // Correct embed YouTube video URL
              style={styles.videoWebview}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              allowsFullscreenVideo={true}  // Allow fullscreen playback
            />
            <Text style={styles.videoDescription}></Text>
          </View>
          
          {/* Example Action Button */}
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.buttonText}>Play Video</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  welcomeScreen: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#3800F5",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  homeScreen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
    padding: 20,
  },
  homeHeading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
  },
  videoContainer: {
    width: "100%",
    height: 250,
    backgroundColor: "#e0e0e0",
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 6,
  },
  videoHeading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  videoWebview: {
    width: "100%",
    height: "80%",
    borderRadius: 10,
  },
  videoDescription: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: "#3800F5",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
