import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from './config/firebase'; // Import Firebase auth

// Import screens
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen'; // Ensure HomeScreen is imported
import MindsetChallengeScreen from './screens/MindsetChallengeScreen'; // Import MindsetChallengeScreen
import QuestionnaireScreen from './screens/QuestionnaireScreen'; // Import any other screens if needed
import ThankYouScreen from './screens/ThankYouScreen'; // Import any other screens if needed

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasCompletedQuestionnaire, setHasCompletedQuestionnaire] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    return unsubscribe; // Cleanup the listener on component unmount
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          !hasCompletedQuestionnaire ? (
            <Stack.Screen name="Questionnaire">
              {(props) => (
                <QuestionnaireScreen
                  {...props}
                  setHasCompletedQuestionnaire={setHasCompletedQuestionnaire}
                />
              )}
            </Stack.Screen>
          ) : (
            <Stack.Screen name="Home" component={HomeScreen} />
          )
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}

        {/* Navigate to Mindset Challenge after Start Game */}
        <Stack.Screen name="MindsetChallenge" component={MindsetChallengeScreen} />

        <Stack.Screen name="ThankYou" component={ThankYouScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
