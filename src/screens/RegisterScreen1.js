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

export default function RegisterScreen1({ onNext, onBack, existingData = {} }) {
  const [nombres, setNombres] = useState(existingData.nombres || '');
  const [apellidos, setApellidos] = useState(existingData.apellidos || '');
  const [correo, setCorreo] = useState(existingData.correo || '');
  const [telefono, setTelefono] = useState(existingData.telefono || '');
  const [tipoUsuario, setTipoUsuario] = useState(existingData.tipoUsuario || '');
  
  const [showModal, setShowModal] = useState(false);
  const userTypes = ['Estudiante', 'Profesor'];

  const handleNext = () => {
    if (!nombres.trim() || !apellidos.trim() || !correo.trim() || !telefono.trim() || !tipoUsuario) {
      Alert.alert('Campos incompletos', 'Por favor llena todos los datos para continuar.');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      Alert.alert('Correo inválido', 'Por favor ingresa un correo electrónico válido.');
      return;
    }

    onNext({
      nombres,
      apellidos,
      correo,
      telefono,
      tipoUsuario,
    });
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
            {/* Nombres Input */}
            <CustomInput
              iconName="user"
              placeholder="Nombres"
              value={nombres}
              onChangeText={setNombres}
            />

            {/* Apellidos Input */}
            <CustomInput
              iconName="user"
              placeholder="Apellidos"
              value={apellidos}
              onChangeText={setApellidos}
            />

            {/* Correo Input */}
            <CustomInput
              iconName="mail"
              placeholder="Correo electrónico"
              value={correo}
              onChangeText={setCorreo}
            />

            {/* Telefono Input */}
            <CustomInput
              iconName="phone"
              placeholder="Teléfono"
              value={telefono}
              onChangeText={setTelefono}
            />

            {/* Tipo de Usuario Input (Dropdown) */}
            <CustomInput
              iconName="book-open"
              placeholder="Tipo de usuario"
              value={tipoUsuario}
              isDropdown={true}
              onPressDropdown={() => setShowModal(true)}
            />
          </View>

          {/* Navigation Button (Circle arrow to next step) */}
          <CustomButton
            type="circle"
            iconName="arrow-right"
            onPress={handleNext}
          />

          {/* Bottom styled footer text */}
          <Text style={styles.bottomText}>Prepárate</Text>

        </ScrollView>
      </KeyboardAvoidingView>

      {/* User type selector modal */}
      <Modal visible={showModal} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecciona Tipo de Usuario</Text>
            {userTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.optionButton,
                  tipoUsuario === type && styles.selectedOptionButton
                ]}
                onPress={() => {
                  setTipoUsuario(type);
                  setShowModal(false);
                }}
              >
                <Text style={[
                  styles.optionText,
                  tipoUsuario === type && styles.selectedOptionText
                ]}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
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
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1a1a2e',
    marginBottom: 20,
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
