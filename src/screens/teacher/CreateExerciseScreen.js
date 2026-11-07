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
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import TeacherHeader from '../../components/TeacherHeader';

export default function CreateExerciseScreen({ onBack }) {
  const [materia, setMateria] = useState('');
  const [tema, setTema] = useState('');
  const [pregunta, setPregunta] = useState('');
  
  // 4 mock answer choices
  const [answers, setAnswers] = useState([
    { id: 1, text: '' },
    { id: 2, text: '' },
    { id: 3, text: '' },
    { id: 4, text: '' },
  ]);
  const [correctAnswerId, setCorrectAnswerId] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleTextChange = (id, text) => {
    setAnswers(prev => prev.map(ans => ans.id === id ? { ...ans, text } : ans));
  };

  const handlePublish = () => {
    if (!materia.trim() || !tema.trim() || !pregunta.trim()) {
      Alert.alert('Campos incompletos', 'Por favor completa la materia, el tema y la pregunta.');
      return;
    }

    const hasEmptyAnswers = answers.some(ans => !ans.text.trim());
    if (hasEmptyAnswers) {
      Alert.alert('Respuestas incompletas', 'Por favor llena las 4 opciones de respuestas.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        '¡Ejercicio Publicado!',
        'El ejercicio ha sido agregado exitosamente a la materia de ' + materia + '.',
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
              <Feather name="edit" size={24} color="#1a1a2e" style={styles.titleIcon} />
              <Text style={styles.titleText}>Crear Ejercicio</Text>
            </View>

            {/* Form */}
            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>Materia</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Escribe la materia..."
                placeholderTextColor="#a0aab8"
                value={materia}
                onChangeText={setMateria}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>Tema</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Escribe el tema..."
                placeholderTextColor="#a0aab8"
                value={tema}
                onChangeText={setTema}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>Pregunta</Text>
              <View style={styles.largeInputWrapper}>
                <TextInput
                  style={styles.largeTextInput}
                  placeholder="Escribe la pregunta o problema..."
                  placeholderTextColor="#a0aab8"
                  multiline={true}
                  numberOfLines={4}
                  value={pregunta}
                  onChangeText={setPregunta}
                />
                
                {/* Visual Action Toolbar */}
                <View style={styles.toolbar}>
                  <TouchableOpacity style={styles.toolBtn}>
                    <Feather name="image" size={18} color="#8d99ae" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.toolBtn}>
                    <MaterialCommunityIcons name="calculator" size={18} color="#8d99ae" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.toolBtn}>
                    <Feather name="mic" size={18} color="#8d99ae" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Answer Choices List */}
            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>Respuestas</Text>
              {answers.map((answer) => (
                <View key={answer.id} style={styles.answerRow}>
                  <Text style={styles.answerNumber}>{answer.id}.</Text>
                  <TextInput
                    style={styles.answerInput}
                    placeholder={`Opción ${answer.id}`}
                    placeholderTextColor="#a0aab8"
                    value={answer.text}
                    onChangeText={(txt) => handleTextChange(answer.id, txt)}
                  />
                  <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() => setCorrectAnswerId(answer.id)}
                  >
                    <MaterialCommunityIcons
                      name={correctAnswerId === answer.id ? 'check-circle' : 'circle-outline'}
                      size={24}
                      color={correctAnswerId === answer.id ? '#00e5ff' : '#2835FF'}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* Action Buttons Row */}
            <View style={styles.actionsRow}>
              <TouchableOpacity style={styles.btnVolver} onPress={onBack}>
                <Text style={styles.btnText}>VOLVER</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.btnPublicar}
                onPress={handlePublish}
                disabled={loading}
              >
                <Text style={styles.btnText}>PUBLICAR</Text>
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
  largeInputWrapper: {
    backgroundColor: '#f4f6fc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
  },
  largeTextInput: {
    minHeight: 80,
    paddingHorizontal: 15,
    paddingTop: 12,
    fontSize: 14,
    color: '#1a1a2e',
    fontWeight: '600',
    textAlignVertical: 'top',
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#eaedf7',
    paddingVertical: 6,
    paddingHorizontal: 15,
  },
  toolBtn: {
    marginLeft: 15,
    padding: 4,
  },
  answerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  answerNumber: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1a1a2e',
    width: 20,
  },
  answerInput: {
    flex: 1,
    backgroundColor: '#f4f6fc',
    borderRadius: 12,
    height: 40,
    paddingHorizontal: 15,
    fontSize: 14,
    color: '#1a1a2e',
    fontWeight: '600',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginRight: 10,
  },
  checkbox: {
    padding: 4,
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
  btnPublicar: {
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
