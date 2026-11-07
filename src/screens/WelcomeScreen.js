import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import BrainLogo from '../components/BrainLogo';

export default function WelcomeScreen({ onNext }) {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Continuous bouncing micro-animation for the chevron indicator
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 8,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [bounceAnim]);

  const handlePress = () => {
    // Graceful fade out before transitioning
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true,
    }).start(() => {
      if (onNext) onNext();
    });
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handlePress}
        style={styles.touchTarget}
      >
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          <StatusBar barStyle="light-content" backgroundColor="#2835FF" />
          
          <View style={styles.centerContent}>
            <BrainLogo size="large" />
          </View>

          <Animated.View 
            style={[
              styles.footerContainer,
              { transform: [{ translateY: bounceAnim }] }
            ]}
          >
            <Text style={styles.footerText}>Toca para comenzar</Text>
            <Feather name="chevron-down" size={24} color="#00e5ff" style={styles.footerIcon} />
          </Animated.View>
        </Animated.View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  touchTarget: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#2835FF', // High-fidelity vibrant electric blue from CELAR 1 mockup
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  footerText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    opacity: 0.8,
    textShadowColor: 'rgba(0, 229, 255, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  footerIcon: {
    marginTop: 8,
    textShadowColor: '#00e5ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
});
