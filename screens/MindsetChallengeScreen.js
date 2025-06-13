import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { firestore, auth } from "../config/firebase"; // Import Firestore and Auth from firebase.js

export default function MindsetChallengeScreen({ route, navigation }) {
  const { avatar } = route.params; // Get the selected avatar from route params

  // Define the questions based on the selected avatar
  const questions = {
    Visionary: [
      {
        question: "Your most anticipated investor meeting just ended in a hard no. What’s your instinct?",
        options: ["Fight", "Flight", "Freeze"],
      },
      {
        question: "Your core team is showing signs of mental fatigue. What’s your response?",
        options: ["Fight", "Flight", "Freeze"],
      },
      {
        question: "You’re receiving negative press online. How do you respond?",
        options: ["Fight", "Flight", "Freeze"],
      },
    ],
    Builder: [
      {
        question: "You find yourself reviewing every little task. A team member confronts you. What do you do?",
        options: ["Fight", "Flight", "Freeze"],
      },
      {
        question: "An operational failure disrupted deliveries. What do you address first?",
        options: ["Fight", "Flight", "Freeze"],
      },
      {
        question: "Cash flow is tight. Your accountant warns you. What do you choose?",
        options: ["Fight", "Flight", "Freeze"],
      },
    ],
    Igniter: [
      {
        question: "You get a new idea during a team call and consider pivoting the product. What’s next?",
        options: ["Fight", "Flight", "Freeze"],
      },
      {
        question: "Two key hires clash emotionally in a meeting. You’re present. What’s your reaction?",
        options: ["Fight", "Flight", "Freeze"],
      },
      {
        question: "After working 16 hours straight, you feel dizzy. You still have tasks. What do you do?",
        options: ["Fight", "Flight", "Freeze"],
      },
    ],
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timer, setTimer] = useState(30); // 30-second timer for each question
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Timer setup
  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            handleAnswerSelection(""); // Automatically select the answer (move to next question)
            return 30; // Reset timer for next question
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval); // Clear interval on component unmount or when the timer stops
  }, [isTimerRunning, currentQuestionIndex]);

  const handleAnswerSelection = (answer) => {
    setAnswers((prevAnswers) => [...prevAnswers, answer]);

    if (currentQuestionIndex === questions[avatar].length - 1) {
      // After answering the last question, navigate to the ThankYouScreen and save the responses
      handleSubmit();
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTimer(30); // Reset the timer
    }
  };

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (user) {
      // Save answers to Firestore
      try {
        await firestore.collection("questionnaire_answers").add({
          email: user.email, // Store user email
          avatar: avatar, // Store selected avatar
          answers: answers, // Store answers for each question
        });

        Alert.alert("Thank you!", "Your answers have been saved!");
        navigation.navigate('ThankYou'); // Navigate to ThankYouScreen after completing the quiz
      } catch (error) {
        console.error("Error saving answers: ", error); // Log the error to see what went wrong
        Alert.alert("Error", "Failed to save your answers. Please try again.");
      }
    } else {
      Alert.alert("Error", "User is not authenticated.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.heading}>Question {currentQuestionIndex + 1}</Text>
        <Text style={styles.timerText}>{timer}s</Text>

        <Text style={styles.question}>{questions[avatar][currentQuestionIndex].question}</Text>

        {questions[avatar][currentQuestionIndex].options.map((option, index) => (
          <TouchableOpacity key={index} style={styles.option} onPress={() => handleAnswerSelection(option)}>
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#21152b', // Dark background theme
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text color
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  timerText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#F44336', // Red color for the timer
    marginBottom: 20,
  },
  question: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF', // White text for the question
    marginBottom: 20,
    marginHorizontal: 20, // Prevent text touching the sides
  },
  option: {
    backgroundColor: '#333', // Dark background for options
    padding: 15,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#00A9FF', // Blue border to match the theme
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 6, // Add shadow effect for the option buttons
  },
  optionText: {
    fontSize: 18,
    color: '#fff', // White text for the option
    fontWeight: 'bold', // Bold text for clarity
  },
});
