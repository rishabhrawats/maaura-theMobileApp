import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ThankYouScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.thankYouText}>Thank You!</Text>
      <Text style={styles.messageText}>Thank you for using the prototype
         more features will be added soon.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Center the content horizontally and vertically
    backgroundColor: '#000', // Black background
    paddingHorizontal: 20, // Optional padding to prevent text from touching the edges
  },
  thankYouText: {
    fontSize: 30,
    color: '#fff', // White color for the text
    fontWeight: 'bold',
    textAlign: 'center', // Center the text
    marginBottom: 10, // Space between the thank you text and the message text
  },
  messageText: {
    fontSize: 18,
    color: '#fff', // White color for the text
    textAlign: 'center', // Center the text
  },
});
