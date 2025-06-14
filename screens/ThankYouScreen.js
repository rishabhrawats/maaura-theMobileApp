import React from 'react';
import { View, Text, StyleSheet, Animated, Easing, Button, ScrollView } from 'react-native';

// This will be used to add animations to the page elements
const AnimatedText = Animated.createAnimatedComponent(Text);

export default function ThankYouScreen({ navigation }) {
  const fadeAnim = new Animated.Value(0); // Initial opacity of the text

  // Use an animation to fade the text in
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Fade in
      duration: 1500, // Duration of the fade
      easing: Easing.ease,
      useNativeDriver: true, // Optimize performance
    }).start();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Title */}
      <AnimatedText style={[styles.title, { opacity: fadeAnim }]}>
        Thank You for Participating!
      </AnimatedText>

      {/* Resilience Score & Rank */}
      <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
        <Text style={styles.scoreText}>Your Resilience Index: 85/100</Text>
        <Text style={styles.rankText}>Rank: Top 15%</Text>
      </Animated.View>

      {/* Card 1: Psychological Breakdown */}
      <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
        <Text style={styles.cardHeading}>Psychological Response Breakdown</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: '70%' }]}>
            <Text style={styles.progressText}>Fight: 70%</Text>
          </View>
          <View style={[styles.progress, { width: '20%' }]}>
            <Text style={styles.progressText}>Flight: 20%</Text>
          </View>
          <View style={[styles.progress, { width: '10%' }]}>
            <Text style={styles.progressText}>Freeze: 10%</Text>
          </View>
        </View>
      </Animated.View>

      {/* Card 2: Personalized Roadmap */}
      <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
        <Text style={styles.cardHeading}>Your Personalized Roadmap</Text>
        <Text style={styles.roadmapText}>1. Journal 3 times per week</Text>
        <Text style={styles.roadmapText}>2. Set Weekly Review Rituals</Text>
        <Text style={styles.roadmapText}>3. Invest in Purpose Coaching</Text>
        <Text style={styles.roadmapText}>4. Improve Decision Making with Storytelling</Text>
      </Animated.View>

      {/* Mood and Overdrive */}
      <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
        <Text style={styles.moodText}>Current Mood: Elevated</Text>
        <Text style={styles.moodSubText}>Challenges ahead can be overcome with strategic reflection!</Text>
      </Animated.View>

      {/* Call to Action */}
      <Animated.View style={{ opacity: fadeAnim }}>
        <Button title="Back to Home" onPress={() => navigation.navigate('Home')} color="#00A9FF" />
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,  // Ensures scroll view is able to stretch
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#21152b',
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#333',
    padding: 20,
    marginVertical: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 8,
  },
  cardHeading: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  scoreText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  rankText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '300',
  },
  progressBar: {
    height: 20,
    backgroundColor: '#444',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  progressText: {
    fontSize: 14,
    color: '#fff',
    paddingHorizontal: 5,
  },
  roadmapText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: '400',
  },
  moodText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  moodSubText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
});
