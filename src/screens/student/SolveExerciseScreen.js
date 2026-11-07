import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import StudentHeader from '../../components/StudentHeader';

export default function SolveExerciseScreen({ onBack }) {
  const [solveView, setSolveView] = useState('list'); // 'list' | 'solver'
  const [selectedSubject, setSelectedSubject] = useState(null);
  
  const [selectedOption, setSelectedOption] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const subjects = [
    { id: 1, name: 'GEOMETRIA', subtitle: 'Geometría Descriptiva', color: '#fc3d39', question: 'Hallar las proyecciones principales de un prisma recto apoyado en su base cuadrangular en el plano horizontal.' },
    { id: 2, name: 'ALGEBRA', subtitle: 'Funciones Lineales', color: '#7209b7', question: 'Determinar y graficar el dominio, rango y la recta de la función lineal f(x) = -2x + 4.' },
  ];

  const options = [
    { id: 1, text: 'Dom: R, Rango: R, Puntos de intersección: (0, 4) y (2, 0)' },
    { id: 2, text: 'Dom: R+, Rango: R+, Puntos de intersección: (0, 2) y (4, 0)' },
    { id: 3, text: 'Dom: [0, 4], Rango: [0, 2], Puntos de intersección: (2, 4)' },
    { id: 4, text: 'Dom: R, Rango: R, Pendiente m = +2 (Creciente), intersección: (0, 0)' },
  ];

  const handleSubjectSelect = (sub) => {
    setSelectedSubject(sub);
    setSelectedOption(null);
    setIsUploaded(false);
    setSolveView('solver');
  };

  const handleUploadSolution = () => {
    Alert.alert(
      'Subir Solución',
      'Selecciona tu archivo de resolución desde la galería o archivos:',
      [
        { text: 'Tomar Foto' },
        { text: 'Cargar de Galería', onPress: () => {
            setIsUploaded(true);
            Alert.alert('¡Carga Exitosa!', 'Archivo "grafica_funciones_lineales.png" adjuntado exitosamente a tu solución.');
          }
        },
        { text: 'Cancelar', style: 'cancel' }
      ]
    );
  };

  const handleSubmitExercise = () => {
    if (!selectedOption) {
      Alert.alert('Opción sin marcar', 'Por favor selecciona la opción que consideres correcta antes de enviar.');
      return;
    }

    if (!isUploaded) {
      Alert.alert('Falta comprobante', 'Por favor sube tu desarrollo matemático presionando en "Subir Solución" para respaldar tu respuesta.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        '¡Ejercicio Enviado!',
        'Tu solución ha sido enviada exitosamente para la revisión del profesor.',
        [{ text: 'Entendido', onPress: () => setSolveView('list') }]
      );
    }, 1200);
  };

  const handleBackAction = () => {
    if (solveView === 'solver') {
      setSolveView('list');
    } else {
      onBack();
    }
  };

  // Renders list of subjects with exercises (CELAR 9)
  const renderList = () => (
    <View style={styles.cardContainer}>
      <View style={styles.titleRow}>
        <Feather name="edit" size={24} color="#1a1a2e" style={styles.titleIcon} />
        <Text style={styles.titleText}>Resolver Ejercicio</Text>
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
              <View style={styles.itemTextContainer}>
                <Text style={styles.itemSubjectText}>{sub.name}</Text>
                <Text style={styles.itemSubtitleText}>{sub.subtitle}</Text>
              </View>
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

  // Renders exercise solver viewport (CELAR 10)
  const renderSolver = () => (
    <View style={styles.cardContainer}>
      {/* Subject Header card inside white container */}
      <View style={styles.titleRow}>
        <Feather name="file-text" size={24} color="#1a1a2e" style={styles.titleIcon} />
        <View style={styles.headerInfoCol}>
          <Text style={styles.headerSubjectTitle}>{selectedSubject?.name}</Text>
          <Text style={styles.headerSubjectSub}>{selectedSubject?.subtitle}</Text>
        </View>
        <View style={[styles.statusDotHeader, { backgroundColor: selectedSubject?.color }]} />
      </View>

      {/* Pregunta Box */}
      <View style={styles.formGroup}>
        <Text style={styles.inputLabel}>Pregunta</Text>
        <Text style={styles.questionBox}>{selectedSubject?.question}</Text>
      </View>

      {/* Multiple choice options */}
      <View style={styles.formGroup}>
        <Text style={styles.inputLabel}>Respuesta</Text>
        {options.map((opt) => (
          <TouchableOpacity
            key={opt.id}
            activeOpacity={0.9}
            style={[
              styles.optionRow,
              selectedOption === opt.id && styles.selectedOptionRow
            ]}
            onPress={() => setSelectedOption(opt.id)}
          >
            <Text style={styles.optionIndex}>{opt.id}.</Text>
            <Text style={styles.optionText}>{opt.text}</Text>
            <View style={styles.checkboxWrapper}>
              <MaterialCommunityIcons
                name={selectedOption === opt.id ? 'check-circle' : 'circle-outline'}
                size={22}
                color={selectedOption === opt.id ? '#06d6a0' : '#2835FF'}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Subir Solución Button */}
      <View style={styles.attachmentWrapper}>
        <TouchableOpacity
          style={[
            styles.btnSubirSolucion,
            isUploaded && styles.btnSubirSolucionDone
          ]}
          onPress={handleUploadSolution}
        >
          <Feather
            name={isUploaded ? 'check' : 'upload'}
            size={16}
            color="#ffffff"
            style={styles.attachmentIcon}
          />
          <Text style={styles.btnSubirText}>
            {isUploaded ? 'SOLUCIÓN SUBIDA' : 'SUBIR SOLUCION'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Action buttons */}
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.btnVolver} onPress={handleBackAction}>
          <Text style={styles.btnText}>VOLVER</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnEnviar}
          onPress={handleSubmitExercise}
          disabled={loading}
        >
          <Text style={styles.btnText}>ENVIAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#2835FF" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <StudentHeader />

          {/* Sub-view rendering */}
          {solveView === 'list' && renderList()}
          {solveView === 'solver' && renderSolver()}
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
    flex: 1,
    fontSize: 20,
    fontWeight: '900',
    color: '#1a1a2e',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  headerInfoCol: {
    flex: 1,
  },
  headerSubjectTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1a1a2e',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  headerSubjectSub: {
    fontSize: 11,
    color: '#8d99ae',
    fontWeight: '700',
    marginTop: 2,
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
  itemTextContainer: {
    flex: 1,
  },
  itemSubjectText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1a1a2e',
    textTransform: 'uppercase',
  },
  itemSubtitleText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8d99ae',
    marginTop: 2,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  formGroup: {
    marginBottom: 15,
    width: '100%',
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#8d99ae',
    textTransform: 'uppercase',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  questionBox: {
    backgroundColor: '#f4f6fc',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 13,
    color: '#1a1a2e',
    fontWeight: '600',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    lineHeight: 18,
    minHeight: 60,
    overflow: 'hidden',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f6fc',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 4,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
  },
  selectedOptionRow: {
    borderColor: '#06d6a0',
    backgroundColor: '#06d6a008',
  },
  optionIndex: {
    fontSize: 14,
    fontWeight: '900',
    color: '#1a1a2e',
    width: 16,
  },
  optionText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: '#1a1a2e',
    lineHeight: 16,
  },
  checkboxWrapper: {
    paddingLeft: 8,
  },
  attachmentWrapper: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 15,
  },
  btnSubirSolucion: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00bdff',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 20,
    shadowColor: '#00bdff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  btnSubirSolucionDone: {
    backgroundColor: '#06d6a0',
    shadowColor: '#06d6a0',
  },
  attachmentIcon: {
    marginRight: 8,
  },
  btnSubirText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.5,
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
