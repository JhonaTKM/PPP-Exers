import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import TeacherHeader from '../../components/TeacherHeader';

export default function SettingsScreen({ onBack, onLogout }) {
  const [nombre, setNombre] = useState('Daniel David');
  const [apellido, setApellido] = useState('Lorenzo Ramos');
  const [especialidad, setEspecialidad] = useState('Álgebra y Geometría');
  const [universidad, setUniversidad] = useState('Universidad Nacional Mayor de San Marcos');
  
  const [loading, setLoading] = useState(false);

  const handleChangePassword = () => {
    Alert.prompt(
      'Cambiar Contraseña',
      'Ingresa tu nueva contraseña para cambiarla:',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: (pass) => {
            if (pass && pass.length >= 6) {
              Alert.alert('¡Cambio Exitoso!', 'Tu contraseña ha sido actualizada correctamente.');
            } else {
              Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
            }
          }
        }
      ],
      'secure-text'
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      '¡Eliminar Cuenta!',
      '¿Estás seguro de que deseas eliminar permanentemente tu cuenta de profesor? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar Cuenta',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Cuenta Eliminada', 'Tu cuenta ha sido eliminada. Regresando al inicio.');
            if (onLogout) onLogout();
          }
        }
      ]
    );
  };

  const handleSaveSettings = () => {
    if (!nombre.trim() || !apellido.trim() || !especialidad.trim() || !universidad.trim()) {
      Alert.alert('Campos vacíos', 'Por favor no dejes campos en blanco.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Ajustes Guardados', 'Tus datos de perfil han sido actualizados de forma exitosa.');
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#2835FF" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Header */}
          <TeacherHeader />

          {/* White Card Container */}
          <View style={styles.cardContainer}>
            
            {/* Title Row */}
            <View style={styles.titleRow}>
              <Feather name="tool" size={24} color="#1a1a2e" style={styles.titleIcon} />
              <Text style={styles.titleText}>Ajustes</Text>
            </View>

            {/* Fields */}
            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>Nombre</Text>
              <TextInput
                style={styles.textInput}
                value={nombre}
                onChangeText={setNombre}
                placeholder="Nombre..."
                placeholderTextColor="#a0aab8"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>Apellido</Text>
              <TextInput
                style={styles.textInput}
                value={apellido}
                onChangeText={setApellido}
                placeholder="Apellido..."
                placeholderTextColor="#a0aab8"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>Especialidad</Text>
              <TextInput
                style={styles.textInput}
                value={especialidad}
                onChangeText={setEspecialidad}
                placeholder="Especialidad..."
                placeholderTextColor="#a0aab8"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>Universidad / Institución</Text>
              <TextInput
                style={styles.textInput}
                value={universidad}
                onChangeText={setUniversidad}
                placeholder="Universidad..."
                placeholderTextColor="#a0aab8"
              />
            </View>

            {/* Inner action buttons inside white container */}
            <View style={styles.settingsActionsWrapper}>
              <TouchableOpacity style={styles.btnChangePassword} onPress={handleChangePassword}>
                <Text style={styles.btnActionText}>CAMBIAR CONTRASEÑA</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.btnDeleteAccount} onPress={handleDeleteAccount}>
                <Text style={styles.btnActionText}>ELIMINAR CUENTA</Text>
              </TouchableOpacity>
            </View>

            {/* Save Profile Button */}
            <TouchableOpacity style={styles.btnSave} onPress={handleSaveSettings} disabled={loading}>
              <Text style={styles.btnSaveText}>{loading ? 'Guardando...' : 'GUARDAR AJUSTES'}</Text>
            </TouchableOpacity>

            {/* Back action button */}
            <View style={styles.actionsRowSingle}>
              <TouchableOpacity style={styles.btnVolver} onPress={onBack}>
                <Text style={styles.btnText}>VOLVER</Text>
              </TouchableOpacity>
            </View>

          </View>

        </ScrollView>
      </View>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    padding: 20,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
    borderWidth: 1.5,
    borderColor: '#e8ecf4',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f3ff',
    paddingBottom: 10,
  },
  titleIcon: {
    marginRight: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1a1a2e',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  formGroup: {
    marginBottom: 12,
    width: '100%',
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#8d99ae',
    textTransform: 'uppercase',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  textInput: {
    backgroundColor: '#f4f6fc',
    borderRadius: 12,
    height: 42,
    paddingHorizontal: 15,
    fontSize: 13,
    color: '#1a1a2e',
    fontWeight: '600',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  settingsActionsWrapper: {
    width: '100%',
    marginTop: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  btnChangePassword: {
    backgroundColor: '#7209b7',
    borderRadius: 12,
    height: 42,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    shadowColor: '#7209b7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  btnDeleteAccount: {
    backgroundColor: '#fc3d39',
    borderRadius: 12,
    height: 42,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    shadowColor: '#fc3d39',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  btnActionText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  btnSave: {
    backgroundColor: '#2835FF',
    borderRadius: 12,
    height: 44,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#2835FF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  btnSaveText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
  },
  actionsRowSingle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 15,
  },
  btnVolver: {
    backgroundColor: '#fc3d39',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 25,
    shadowColor: '#fc3d39',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  btnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
