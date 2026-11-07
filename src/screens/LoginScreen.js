import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  StatusBar,
} from 'react-native';
import BrainLogo from '../components/BrainLogo';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

export default function LoginScreen({ onLoginSuccess, onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Campos incompletos', 'Por favor ingresa tu usuario y contraseña.');
      return;
    }

    setLoading(true);

    // Mock API request delay
    setTimeout(() => {
      setLoading(false);
      // Let's accept any non-empty password for mock login
      onLoginSuccess({ username });
    }, 1200);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#2835FF" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Celar 2 Small Logo */}
        <BrainLogo size="small" />

        {/* stylized title */}
        <Text style={styles.title}>Iniciar Sesion</Text>

        <View style={styles.formContainer}>
          {/* User Input */}
          <CustomInput
            iconName="user"
            iconType="feather"
            placeholder="Usuario"
            value={username}
            onChangeText={setUsername}
          />

          {/* Password Input */}
          <CustomInput
            iconName="key"
            iconType="feather"
            placeholder="Contraseña"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.actionContainer}>
          {/* Ingresar Button */}
          <CustomButton
            title="Ingresar"
            type="primary"
            loading={loading}
            onPress={handleLogin}
          />

          {/* Registrar Button */}
          <CustomButton
            title="Registrar"
            type="secondary"
            onPress={onRegister}
          />
        </View>

        {/* Bottom banner text */}
        <Text style={styles.bottomText}>Bienvenidos</Text>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2835FF', // Vibrant electric blue from CELAR 2 mockup
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
  },
  title: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 2,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginVertical: 15,
    // High-impact outline/shadow effect
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  formContainer: {
    width: '100%',
    marginVertical: 10,
  },
  actionContainer: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
  },
  bottomText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 5,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 10,
    textShadowColor: 'rgba(0, 229, 255, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});
