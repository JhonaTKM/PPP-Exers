import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import TeacherHeader from '../../components/TeacherHeader';

export default function CreateSubjectScreen({ onBack, onAddSubject }) {
  const [nombre, setNombre] = useState('');
  const [seccion, setSeccion] = useState('');
  const [aula, setAula] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = () => {
    if (!nombre.trim() || !seccion.trim() || !aula.trim() || !descripcion.trim()) {
      Alert.alert('Campos incompletos', 'Por favor completa todos los campos del formulario.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const newSubject = {
        name: nombre.toUpperCase(),
        color: ['#fc3d39', '#ffd166', '#06d6a0', '#7209b7', '#00bdff'][Math.floor(Math.random() * 5)],
      };
      
      if (onAddSubject) onAddSubject(newSubject);
      
      Alert.alert(
        '¡Materia Creada!',
        `La materia de ${nombre.toUpperCase()} ha sido registrada exitosamente.`,
        [{ text: 'Entendido', onPress: onBack }]
      );
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#2835FF" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Header */}
          <TeacherHeader />

          {/* White Card Container */}
          <View style={styles.cardContainer}>
            
            {/* Title Header */}
            <View style={styles.titleRow}>
              <Feather name="folder-plus" size={24} color="#1a1a2e" style={styles.titleIcon} />
              <Text style={styles.titleText}>Crear Materia</Text>
            </View>

            {/* Form Fields */}
            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>Nombre de la Materia</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Ej. ÁLGEBRA, GEOMETRÍA..."
                placeholderTextColor="#a0aab8"
                value={nombre}
                onChangeText={setNombre}
                autoCapitalize="characters"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>Sección</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Ej. B, A, C..."
                placeholderTextColor="#a0aab8"
                value={seccion}
                onChangeText={setSeccion}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>Aula</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Ej. A-102, Laboratorio 3..."
                placeholderTextColor="#a0aab8"
                value={aula}
                onChangeText={setAula}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>Descripción</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Escribe una breve descripción del curso..."
                placeholderTextColor="#a0aab8"
                multiline={true}
                numberOfLines={4}
                value={descripcion}
                onChangeText={setDescripcion}
              />
            </View>

            {/* Action Buttons Row */}
            <View style={styles.actionsRow}>
              <TouchableOpacity style={styles.btnVolver} onPress={onBack}>
                <Text style={styles.btnText}>VOLVER</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.btnAgregar}
                onPress={handleAdd}
                disabled={loading}
              >
                <Text style={styles.btnText}>AGREGAR</Text>
              </TouchableOpacity>
            </View>

          </View>

        </ScrollView>
      </KeyboardAvoidingView>
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
    paddingTop: Platform.OS === 'ios' ? 10 : 10,
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
    marginBottom: 15,
    width: '100%',
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: '#8d99ae',
    textTransform: 'uppercase',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  textInput: {
    backgroundColor: '#f4f6fc',
    borderRadius: 12,
    height: 44,
    paddingHorizontal: 15,
    fontSize: 14,
    color: '#1a1a2e',
    fontWeight: '600',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
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
  btnAgregar: {
    backgroundColor: '#2835FF',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 25,
    shadowColor: '#2835FF',
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
