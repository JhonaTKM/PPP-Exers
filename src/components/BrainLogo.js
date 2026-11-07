import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function BrainLogo({ size = 'small' }) {
  if (size === 'large') {
    return (
      <View style={styles.largeContainer}>
        <View style={styles.largeTextCol}>
          <Text style={styles.largeText}>EX</Text>
          <Text style={styles.largeText}>ERS</Text>
        </View>
        <View style={styles.largeBrainWrapper}>
          <MaterialCommunityIcons name="brain" size={90} color="#00e5ff" style={styles.glowBrain} />
        </View>
      </View>
    );
  }

  // Small logo (Celar 2, 3, 4 style: Brain on top, "Exs" below)
  return (
    <View style={styles.smallContainer}>
      <View style={styles.smallBrainWrapper}>
        <MaterialCommunityIcons name="brain" size={64} color="#00e5ff" style={styles.glowBrainSmall} />
      </View>
      <Text style={styles.smallText}>Exs</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  largeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
  },
  largeTextCol: {
    marginRight: 10,
    justifyContent: 'center',
  },
  largeText: {
    color: '#ffffff',
    fontSize: 54,
    fontWeight: '900',
    letterSpacing: -1,
    lineHeight: 52,
    textTransform: 'uppercase',
    fontStyle: 'italic',
    // Soft cybernetic drop shadow
    textShadowColor: 'rgba(0, 229, 255, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  largeBrainWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  glowBrain: {
    // Glowing neon brain effect
    textShadowColor: '#00e5ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  smallContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  smallBrainWrapper: {
    marginBottom: 5,
  },
  glowBrainSmall: {
    textShadowColor: '#00e5ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  smallText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 0.5,
    fontStyle: 'italic',
    textTransform: 'none',
    textShadowColor: 'rgba(0, 229, 255, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});
