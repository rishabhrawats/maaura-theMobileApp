import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from './config/firebase'; // Import Firebase auth

// Import screens
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import QuestionnaireScreen from './screens/QuestionnaireScreen'; // Add the QuestionnaireScreen import

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
          // After logging in, navigate to the questionnaire if not completed
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
            <Stack.Screen name="Home">
              {(props) => <HomeScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
          )
        ) : (
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
