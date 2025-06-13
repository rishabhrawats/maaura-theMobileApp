import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [selectedAvatar, setSelectedAvatar] = useState(null); // State to store selected avatar
  const scaleValue = new Animated.Value(1); // For button animation

  // Animation for the Start Game button
  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  // Avatar Selection
  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar); // Update the selected avatar
  };

  // Check if an avatar is selected
  const isAvatarSelected = selectedAvatar !== null;

  return (
    <View style={styles.container}>
      {/* Background Color */}
      <View style={styles.background}></View>

      {/* Avatar Selection */}
      <Text style={styles.welcomeText}>Choose Your Avatar</Text>

      <View style={styles.avatarContainer}>
        {/* Avatar 1: Visionary */}
        <TouchableOpacity
          style={[styles.avatarButton, selectedAvatar === 'Visionary' && styles.selectedAvatar]}
          onPress={() => handleAvatarSelect('Visionary')}
        >
          <Image source={require('../Media/visionary.jpg')} style={styles.avatarImage} />
          <Text style={styles.avatarText}>Visionary</Text>
        </TouchableOpacity>

        {/* Avatar 2: Igniter */}
        <TouchableOpacity
          style={[styles.avatarButton, selectedAvatar === 'Igniter' && styles.selectedAvatar]}
          onPress={() => handleAvatarSelect('Igniter')}
        >
          <Image source={require('../Media/operator.jpg')} style={styles.avatarImage} />
          <Text style={styles.avatarText}>Igniter</Text>
        </TouchableOpacity>

        {/* Avatar 3: Builder */}
        <TouchableOpacity
          style={[styles.avatarButton, selectedAvatar === 'Builder' && styles.selectedAvatar]}
          onPress={() => handleAvatarSelect('Builder')}
        >
          <Image source={require('../Media/strategist.jpg')} style={styles.avatarImage} />
          <Text style={styles.avatarText}>Builder</Text>
        </TouchableOpacity>
      </View>

      {/* Start Game Button with Animation */}
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <TouchableOpacity
          style={[styles.startButton, !isAvatarSelected && styles.disabledButton]}
          onPress={() => isAvatarSelected && navigation.navigate('MindsetChallenge', { avatar: selectedAvatar })} // Pass the selected avatar to the MindsetChallenge screen
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={!isAvatarSelected} // Disable the button if no avatar is selected
        >
          <Text style={styles.buttonText}>Start Game</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#21152b',
    paddingTop: 0,
    paddingBottom: 30,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
    opacity: 0.8,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Center the avatars horizontally
    alignItems: 'center', // Align them vertically in the center
    marginBottom: 40,
    width: '100%',
    paddingHorizontal: 20,
  },
  avatarButton: {
    alignItems: 'center',
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#333',
    width: 100,
    justifyContent: 'center',
  },
  selectedAvatar: {
    borderWidth: 2,
    borderColor: '#00A9FF',
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  avatarText: {
    color: '#fff',
    fontSize: 14,
  },
  startButton: {
    backgroundColor: '#00A9FF',
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 25,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 15,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#fff',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 1.2,
    textAlign: 'center',
  },
});
