import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import BrainLogo from '../components/BrainLogo';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

export default function RegisterScreen2({ onSubmit, onBack }) {
  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [ciudad, setCiudad] = useState('');
  
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const cities = ['Quito', 'Guayaquil', 'Cuenca', 'Santo Domingo', 'Ambato', 'Loja', 'Manta', 'Ibargüengoitia'];

  const handleRegister = () => {
    if (!cedula.trim() || !password.trim() || !confirmPassword.trim() || !ciudad) {
      Alert.alert('Campos incompletos', 'Por favor llena todos los datos para continuar.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error de contraseña', 'Las contraseñas ingresadas no coinciden.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Contraseña débil', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoading(true);

    // Mock API register latency
    setTimeout(() => {
      setLoading(false);
      onSubmit({
        cedula,
        password,
        ciudad,
      });
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#2835FF" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {/* Back navigation arrow */}
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Feather name="arrow-left" size={24} color="#ffffff" />
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Header Brain Logo */}
          <BrainLogo size="small" />

          {/* Title */}
          <Text style={styles.title}>Registrar</Text>

          <View style={styles.formContainer}>
            {/* Cédula/DNI Input */}
            <CustomInput
              iconName="credit-card"
              placeholder="Cédula / DNI"
              value={cedula}
              onChangeText={setCedula}
            />

            {/* Contraseña Input */}
            <CustomInput
              iconName="key"
              placeholder="Contraseña"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />

            {/* Ciudad Dropdown */}
            <CustomInput
              iconName="map-pin"
              placeholder="Ciudad"
              value={ciudad}
              isDropdown={true}
              onPressDropdown={() => setShowModal(true)}
            />

            {/* Confirmar Contraseña Input */}
            <CustomInput
              iconName="key"
              placeholder="Confirmar Contraseña"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          {/* Registrar Button */}
          <View style={styles.buttonWrapper}>
            <CustomButton
              title="Registrar"
              type="secondary"
              loading={loading}
              onPress={handleRegister}
            />
          </View>

          {/* Bottom styled footer text */}
          <Text style={styles.bottomText}>Prepárate</Text>

        </ScrollView>
      </KeyboardAvoidingView>

      {/* City selector modal */}
      <Modal visible={showModal} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecciona tu Ciudad</Text>
            <ScrollView style={styles.citiesScroll} showsVerticalScrollIndicator={false}>
              {cities.map((city) => (
                <TouchableOpacity
                  key={city}
                  style={[
                    styles.optionButton,
                    ciudad === city && styles.selectedOptionButton
                  ]}
                  onPress={() => {
                    setCiudad(city);
                    setShowModal(false);
                  }}
                >
                  <Text style={[
                    styles.optionText,
                    ciudad === city && styles.selectedOptionText
                  ]}>
                    {city}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowModal(false)}>
              <Text style={styles.closeButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2835FF',
  },
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 20 : 15,
    left: 20,
    zIndex: 10,
    padding: 8,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    paddingBottom: 20,
  },
  title: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 2,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginVertical: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  formContainer: {
    width: '100%',
    marginVertical: 5,
  },
  buttonWrapper: {
    width: '100%',
    marginVertical: 15,
  },
  bottomText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 5,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 5,
    textShadowColor: 'rgba(0, 229, 255, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
    alignItems: 'center',
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1a1a2e',
    marginBottom: 20,
  },
  citiesScroll: {
    width: '100%',
  },
  optionButton: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f4f6fc',
    marginVertical: 6,
    alignItems: 'center',
  },
  selectedOptionButton: {
    backgroundColor: '#2835FF',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  selectedOptionText: {
    color: '#ffffff',
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
  },
  closeButtonText: {
    color: '#fc3d39',
    fontSize: 15,
    fontWeight: '700',
  },
});
