import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import TeacherHeader from '../../components/TeacherHeader';

export default function GradingScreen({ onBack }) {
  const [gradeView, setGradeView] = useState('subjects'); // 'subjects' | 'tasks' | 'grade'
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const [score, setScore] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const subjects = [
    { id: 1, name: 'GEOMETRIA', color: '#fc3d39' },
    { id: 2, name: 'ARITMETICA', color: '#ffd166' },
    { id: 3, name: 'ALGEBRA', color: '#7209b7' },
  ];

  const tasks = [
    { id: 101, title: 'Funciones Lineales', status: 'ENTREGADOS', color: '#06d6a0' },
    { id: 102, title: 'Sistemas de Ecuaciones', status: 'COMPLETADO', color: '#8d99ae' },
  ];

  const handleSubjectSelect = (sub) => {
    setSelectedSubject(sub);
    setGradeView('tasks');
  };

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
    setScore('');
    setFeedback('');
    setGradeView('grade');
  };

  const handleGradeSubmit = () => {
    if (!score.trim() || !feedback.trim()) {
      Alert.alert('Calificación incompleta', 'Por favor ingresa la calificación y una observación.');
      return;
    }

    const numScore = parseFloat(score);
    if (isNaN(numScore) || numScore < 0 || numScore > 20) {
      Alert.alert('Calificación inválida', 'Por favor ingresa un puntaje válido entre 0 y 20.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        '¡Calificación Enviada!',
        `El alumno Ricardo Aldair Calderon Flores ha sido calificado con ${score}/20 exitosamente.`,
        [{ text: 'Entendido', onPress: () => setGradeView('tasks') }]
      );
    }, 1200);
  };

  const handleViewAttachment = () => {
    Alert.alert(
      'Visualizador de Solución',
      'Mostrando el archivo cargado por el alumno:\n📄 grafica_funciones_lineales.png\n📐 Resoluciones correspondientes completadas en formato digital.',
      [{ text: 'Cerrar' }]
    );
  };

  const handleBackAction = () => {
    if (gradeView === 'grade') {
      setGradeView('tasks');
    } else if (gradeView === 'tasks') {
      setGradeView('subjects');
    } else {
      onBack();
    }
  };

  // Subject folder directory (CELAR 15)
  const renderSubjects = () => (
    <View style={styles.cardContainer}>
      <View style={styles.titleRow}>
        <Feather name="bar-chart-2" size={24} color="#1a1a2e" style={styles.titleIcon} />
        <Text style={styles.titleText}>Calificación</Text>
      </View>

      <View style={styles.listContainer}>
        {subjects.map((sub) => (
          <TouchableOpacity
            key={sub.id}
            activeOpacity={0.8}
            style={styles.listItem}
            onPress={() => handleSubjectSelect(sub)}
          >
            <View style={styles.listItemLeft}>
              <Feather name="file-text" size={20} color="#8d99ae" style={styles.listIcon} />
              <Text style={styles.listItemText}>{sub.name}</Text>
            </View>
            <View style={[styles.statusDot, { backgroundColor: sub.color }]} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.actionsRowSingle}>
        <TouchableOpacity style={styles.btnVolver} onPress={handleBackAction}>
          <Text style={styles.btnText}>VOLVER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Homework task files (CELAR 20)
  const renderTasks = () => (
    <View style={styles.cardContainer}>
      <View style={styles.titleRow}>
        <Feather name="folder" size={24} color="#1a1a2e" style={styles.titleIcon} />
        <Text style={styles.titleText}>{selectedSubject?.name}</Text>
        <View style={[styles.statusDotHeader, { backgroundColor: selectedSubject?.color }]} />
      </View>

      <View style={styles.listContainer}>
        {tasks.map((task) => (
          <TouchableOpacity
            key={task.id}
            activeOpacity={0.8}
            style={styles.listItem}
            onPress={() => handleTaskSelect(task)}
          >
            <View style={styles.listItemLeft}>
              <Feather name="edit-3" size={20} color="#8d99ae" style={styles.listIcon} />
              <Text style={styles.listItemText}>{task.title}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: task.status === 'ENTREGADOS' ? '#06d6a0' : '#8d99ae' }]}>
              <Text style={styles.badgeText}>{task.status}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.actionsRowSingle}>
        <TouchableOpacity style={styles.btnVolver} onPress={handleBackAction}>
          <Text style={styles.btnText}>VOLVER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Homework grading score sheet (CELAR 21)
  const renderGradingPortal = () => (
    <View style={styles.cardContainer}>
      <View style={styles.titleRow}>
        <Feather name="check-square" size={24} color="#1a1a2e" style={styles.titleIcon} />
        <Text style={styles.titleText}>{selectedTask?.title}</Text>
        <View style={[styles.statusDotHeader, { backgroundColor: selectedSubject?.color }]} />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.inputLabel}>Alumno</Text>
        <Text style={styles.staticBoxText}>Ricardo Aldair Calderon Flores</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.inputLabel}>Pregunta</Text>
        <Text style={styles.staticBoxTextArea}>
          Determinar y graficar el dominio, rango y la recta de la función lineal f(x) = -2x + 4.
        </Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.inputLabel}>Respuesta del Alumno</Text>
        <Text style={styles.staticBoxTextArea}>
          El dominio son todos los reales R. El rango también son los reales R. La pendiente m = -2 (negativa), cruza el eje y en (0,4) y cruza el eje x en (2,0).
        </Text>
      </View>

      {/* Solutions mock attachment buttons */}
      <View style={styles.attachmentRow}>
        <TouchableOpacity style={styles.btnVerSolucion} onPress={handleViewAttachment}>
          <Feather name="eye" size={16} color="#ffffff" style={styles.btnSolucionIcon} />
          <Text style={styles.btnSolucionText}>VER SOLUCIÓN</Text>
        </TouchableOpacity>
      </View>

      {/* Grade and Observation blocks */}
      <View style={styles.gradeFeedbackRow}>
        <View style={styles.gradeInputCol}>
          <Text style={styles.inputLabel}>Calificación</Text>
          <TextInput
            style={styles.gradeInput}
            placeholder="0-20"
            placeholderTextColor="#a0aab8"
            keyboardType="numeric"
            maxLength={2}
            value={score}
            onChangeText={setScore}
          />
        </View>
        <View style={styles.feedbackInputCol}>
          <Text style={styles.inputLabel}>Observación</Text>
          <TextInput
            style={styles.feedbackInput}
            placeholder="Observaciones de la tarea..."
            placeholderTextColor="#a0aab8"
            multiline={true}
            numberOfLines={3}
            value={feedback}
            onChangeText={setFeedback}
          />
        </View>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.btnVolver} onPress={handleBackAction}>
          <Text style={styles.btnText}>VOLVER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnEnviar} onPress={handleGradeSubmit} disabled={loading}>
          <Text style={styles.btnText}>ENVIAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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

          {/* Sub-view rendering */}
          {gradeView === 'subjects' && renderSubjects()}
          {gradeView === 'tasks' && renderTasks()}
          {gradeView === 'grade' && renderGradingPortal()}
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
    flex: 1,
    fontSize: 20,
    fontWeight: '900',
    color: '#1a1a2e',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statusDotHeader: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginLeft: 10,
  },
  listContainer: {
    width: '100%',
    marginVertical: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f4f6fc',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 15,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  listItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  listIcon: {
    marginRight: 10,
  },
  listItemText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1a1a2e',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  badge: {
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '900',
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
  staticBoxText: {
    backgroundColor: '#f4f6fc',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1a1a2e',
    fontWeight: '600',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
  },
  staticBoxTextArea: {
    backgroundColor: '#f4f6fc',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 13,
    color: '#1a1a2e',
    fontWeight: '600',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    minHeight: 60,
    lineHeight: 18,
    overflow: 'hidden',
  },
  attachmentRow: {
    width: '100%',
    marginVertical: 10,
    alignItems: 'flex-start',
  },
  btnVerSolucion: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00bdff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 15,
    shadowColor: '#00bdff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  btnSolucionIcon: {
    marginRight: 6,
  },
  btnSolucionText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '900',
  },
  gradeFeedbackRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
    marginBottom: 15,
  },
  gradeInputCol: {
    width: '26%',
  },
  gradeInput: {
    backgroundColor: '#f4f6fc',
    borderRadius: 12,
    height: 48,
    textAlign: 'center',
    fontSize: 16,
    color: '#1a1a2e',
    fontWeight: '800',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  feedbackInputCol: {
    width: '70%',
  },
  feedbackInput: {
    backgroundColor: '#f4f6fc',
    borderRadius: 12,
    height: 80,
    paddingHorizontal: 15,
    paddingTop: 12,
    fontSize: 13,
    color: '#1a1a2e',
    fontWeight: '600',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    textAlignVertical: 'top',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionsRowSingle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
  btnEnviar: {
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
