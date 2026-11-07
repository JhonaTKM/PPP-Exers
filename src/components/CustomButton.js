import React, { useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, Animated, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function CustomButton({
  title,
  onPress,
  type = 'primary', // 'primary' | 'secondary' | 'circle'
  loading = false,
  disabled = false,
  iconName = 'arrow-right',
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 40,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const getButtonStyle = () => {
    switch (type) {
      case 'secondary':
        return styles.secondaryButton;
      case 'circle':
        return styles.circleButton;
      case 'primary':
      default:
        return styles.primaryButton;
    }
  };

  const getTextStyle = () => {
    switch (type) {
      case 'secondary':
        return styles.secondaryText;
      case 'primary':
      default:
        return styles.primaryText;
    }
  };

  if (type === 'circle') {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        style={styles.circleWrapper}
      >
        <Animated.View style={[styles.circleButton, { transform: [{ scale: scaleAnim }] }]}>
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Feather name={iconName} size={24} color="#ffffff" />
          )}
        </Animated.View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      style={styles.buttonWrapper}
    >
      <Animated.View
        style={[
          styles.buttonBase,
          getButtonStyle(),
          { transform: [{ scale: scaleAnim }] },
          disabled && styles.disabled,
        ]}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={[styles.textBase, getTextStyle()]}>{title}</Text>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonBase: {
    width: '100%',
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  primaryButton: {
    backgroundColor: '#101bb0', // Custom dark navy blue from the mockup
    borderWidth: 1,
    borderColor: '#1928e3',
  },
  secondaryButton: {
    backgroundColor: '#00bdff', // Custom cyan blue from the mockup
    borderWidth: 1,
    borderColor: '#00a3db',
  },
  disabled: {
    opacity: 0.6,
  },
  textBase: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  primaryText: {
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  secondaryText: {
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  circleWrapper: {
    alignItems: 'center',
    marginVertical: 15,
  },
  circleButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#00bdff', // Vibrant cyan/blue circle arrow button
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00bdff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
});
