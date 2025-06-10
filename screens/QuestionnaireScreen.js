import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";

export default ({ navigation, setHasCompletedQuestionnaire }) => {
  const questions = [
    {
      question:
        "When facing a business problem with no clear solution, how do you typically respond?",
      options: [
        "Analyze data and take a calculated approach",
        "Trust intuition and make quick decisions",
        "Ask others for advice and feedback",
        "Wait and see, hoping the solution becomes clear",
      ],
    },
    {
      question: "How do you handle uncertainty around your business idea's success?",
      options: [
        "Stay optimistic and push forward",
        "Conduct market research and try to gather more data",
        "Get advice from others or seek mentors",
        "Become anxious and overthink possible outcomes",
      ],
    },
    {
      question: "In a typical week, how many significant business decisions do you make?",
      options: [
        "1-2 decisions",
        "3-5 decisions",
        "5-10 decisions",
        "More than 10 decisions",
      ],
    },
    {
      question:
        "Over the past 2 weeks, how often have you experienced difficulty sleeping due to stress or overthinking?",
      options: [
        "Never",
        "Occasionally",
        "Frequently",
        "Almost every night",
      ],
    },
    {
      question:
        "Which of these statements best describes your emotional state as an entrepreneur?",
      options: [
        "I feel mostly calm and balanced",
        "I feel stressed but can manage it",
        "I often feel overwhelmed and anxious",
        "I feel completely burnt out",
      ],
    },
    {
      question:
        "If you had to launch a minimum viable version of your idea this weekend, how ready would you be?",
      options: [
        "I’m fully ready to launch",
        "I need some time to finalize a few things",
        "I would need more time to refine my idea",
        "I’m not ready at all",
      ],
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Tracks the current question
  const [answers, setAnswers] = useState([]); // Stores answers for each question
  const [isIntroScreen, setIsIntroScreen] = useState(true); // Tracks whether we are on the intro screen
  const [timer, setTimer] = useState(30); // 30-second timer for each question

  useEffect(() => {
    let interval;

    if (!isIntroScreen) {
      // Start the timer if the intro screen is passed
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            handleAnswerSelection(""); // Automatically move to next question if time runs out
            return 30; // Reset timer for next question
          }
          return prev - 1;
        });
      }, 1000); // Decrease timer every second
    }

    return () => clearInterval(interval);
  }, [isIntroScreen, currentQuestionIndex]);

  const handleAnswerSelection = (answer) => {
    // Store the answer
    if (answer) {
      setAnswers((prevAnswers) => [...prevAnswers, answer]);
    }

    // If this is the last question, submit the answers
    if (currentQuestionIndex === questions.length - 1) {
      handleSubmit();
    } else {
      // Move to the next question
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTimer(30); // Reset the timer for the next question
    }
  };

  const handleSubmit = () => {
    if (answers.length > questions.length) {
      Alert.alert("Error", "Please answer all questions before submitting.");
      return;
    }

    // Update the state to indicate that the questionnaire has been completed
    setHasCompletedQuestionnaire(true);

    // After submission, navigate to HomeScreen or another screen
    Alert.alert("Success", "Thank you for your answers!", [
      {
        text: "OK",
        onPress: () => navigation.navigate("Home"), // Navigate to HomeScreen after completion
      },
    ]);
  };

  const handleStart = () => {
    setIsIntroScreen(false); // Start the questionnaire
    setTimer(30); // Reset timer when starting
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}>
        <View style={{ alignItems: "center", paddingVertical: 50 }}>
          {isIntroScreen ? (
            // Intro screen
            <View style={styles.card}>
              <Text style={styles.heading}>Let's have a quick questionnaire round!</Text>
              <Text style={styles.infoText}>
                You will have 30 seconds to answer each question. Try to answer as quickly as possible.
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={handleStart}
              >
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          ) : (
            // Question screen
            <>
              <Text style={styles.heading}>Question {currentQuestionIndex + 1}</Text>

              {/* Timer */}
              <Text style={styles.timerText}>{timer}s</Text>

              {/* Progress Bar */}
              <View style={styles.progressContainer}>
                <View
                  style={[
                    styles.progressBar,
                    {
                      width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                    },
                  ]}
                />
              </View>

              {/* Display the current question */}
              <View style={styles.card}>
                <Text style={styles.questionText}>
                  {questions[currentQuestionIndex].question}
                </Text>

                {questions[currentQuestionIndex].options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.option}
                    onPress={() => handleAnswerSelection(option)}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 32,
    textAlign: "center",
    paddingHorizontal: 20, // Prevent touching the screen edges
  },
  timerText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#F44336",
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  progressContainer: {
    width: "100%",
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginBottom: 20,
    marginTop: 10,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#3800F5",
    borderRadius: 4,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 25,
    marginBottom: 20,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  questionText: {
    fontSize: 20,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  option: {
    backgroundColor: "#F8F9FB",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ECE6FF",
    marginBottom: 15,
    paddingVertical: 14,
    paddingHorizontal: 20,
    shadowColor: "#0000001A",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  optionText: {
    color: "#333",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "normal",
  },
  button: {
    backgroundColor: "#3800F5",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
};
