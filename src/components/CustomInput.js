import React, { useState, useRef } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Animated } from 'react-native';
import { FontAwesome5, Feather } from '@expo/vector-icons';

export default function CustomInput({
  iconName,
  iconType = 'feather', // 'feather' or 'font-awesome'
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  isDropdown = false,
  onPressDropdown,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(!secureTextEntry);
  
  // Focus animation
  const focusAnim = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(focusAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(focusAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  // Interpolated styles for focus effect
  const borderColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', '#00e5ff'],
  });

  const scale = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.02],
  });

  const renderIcon = () => {
    const size = 18;
    const color = '#2E40FF';
    if (iconType === 'font-awesome') {
      return <FontAwesome5 name={iconName} size={size} color={color} style={styles.icon} />;
    }
    return <Feather name={iconName} size={size} color={color} style={styles.icon} />;
  };

  if (isDropdown) {
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={onPressDropdown}>
        <Animated.View
          style={[
            styles.container,
            {
              borderColor: borderColor,
              borderWidth: 2,
              transform: [{ scale: scale }],
            },
          ]}
        >
          {renderIcon()}
          <TextInput
            style={[styles.input, { color: '#000000' }]}
            placeholder={placeholder}
            placeholderTextColor="#8d99ae"
            value={value}
            editable={false} // Make it static click-only
            pointerEvents="none"
          />
          <Feather name="chevron-down" size={18} color="#2E40FF" style={styles.rightIcon} />
        </Animated.View>
      </TouchableOpacity>
    );
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          borderColor: borderColor,
          borderWidth: 2,
          transform: [{ scale: scale }],
        },
      ]}
    >
      {renderIcon()}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#8d99ae"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry && !showPassword}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoCapitalize="none"
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.rightIcon}>
          <Feather name={showPassword ? 'eye-off' : 'eye'} size={18} color="#2E40FF" />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    height: 50,
    marginVertical: 8,
    paddingHorizontal: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1a1a2e',
    fontWeight: '500',
    height: '100%',
    paddingRight: 10,
  },
  rightIcon: {
    padding: 4,
  },
});
