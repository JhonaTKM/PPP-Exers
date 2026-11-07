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
import { Feather } from '@expo/vector-icons';
import StudentHeader from '../../components/StudentHeader';

export default function StudentSubjectsScreen({ onBack }) {
  const [subView, setSubView] = useState('list'); // 'list' | 'browse' | 'join_detail'
  const [selectedClass, setSelectedClass] = useState(null);

  // My Enrolled Classes List (CELAR 12)
  const [enrolledClasses, setEnrolledClasses] = useState([
    { id: 1, name: 'GEOMETRIA', professor: 'Frank Infante Ramos', color: '#fc3d39' },
  ]);

  // Browse Directory Classes List (CELAR 24)
  const availableClasses = [
    { id: 10, name: 'GEOMETRIA', professor: 'Rosa Elena Aldave', color: '#7209b7', section: 'A', vacantes: 12, desc: 'Conceptos avanzados de geometría espacial, sólidos platónicos y proyecciones.' },
    { id: 11, name: 'ARITMETICA', professor: 'Rosa Elena Aldave', color: '#7209b7', section: 'C', vacantes: 8, desc: 'Operaciones fundamentales de los números, divisibilidad y teoría de números.' },
    { id: 12, name: 'ALGEBRA', professor: 'Daniel Lorenzo Ramos', color: '#7209b7', section: 'B', vacantes: 15, desc: 'Estudio analítico de variables, polinomios, factorización y funciones lineales.' },
  ];

  const handleClassSelect = (cls) => {
    setSelectedClass(cls);
    setSubView('join_detail');
  };

  const handleJoinClass = () => {
    if (!selectedClass) return;

    // Check if already enrolled
    const isAlreadyEnrolled = enrolledClasses.some(c => c.name === selectedClass.name);
    if (isAlreadyEnrolled) {
      Alert.alert('Ya registrado', 'Ya estás matriculado en una sección de esta materia.');
      setSubView('list');
      return;
    }

    Alert.alert(
      '¡Matrícula Exitosa!',
      `Te has unido exitosamente a la materia de ${selectedClass.name} con el profesor ${selectedClass.professor}.`,
      [
        {
          text: 'Entendido',
          onPress: () => {
            const newEnrolled = {
              id: enrolledClasses.length + 1,
              name: selectedClass.name,
              professor: selectedClass.professor,
              color: '#06d6a0', // green enrolled indicator
            };
            setEnrolledClasses(prev => [...prev, newEnrolled]);
            setSubView('list');
          }
        }
      ]
    );
  };

  const handleBackAction = () => {
    if (subView === 'join_detail') {
      setSubView('browse');
    } else if (subView === 'browse') {
      setSubView('list');
    } else {
      onBack();
    }
  };

  // Render enrolled list (CELAR 12)
  const renderEnrolled = () => (
    <View style={styles.cardContainer}>
      <View style={styles.titleRow}>
        <Feather name="folder" size={24} color="#1a1a2e" style={styles.titleIcon} />
        <Text style={styles.titleText}>Materias</Text>
      </View>

      <View style={styles.listContainer}>
        {enrolledClasses.map((cls) => (
          <View key={cls.id} style={styles.listItemStatic}>
            <View style={styles.listItemLeft}>
              <Feather name="file-text" size={20} color="#8d99ae" style={styles.listIcon} />
              <View style={styles.itemTextContainer}>
                <Text style={styles.itemSubjectText}>{cls.name}</Text>
                <Text style={styles.itemProfessorText}>Profesor: {cls.professor}</Text>
              </View>
            </View>
            <View style={[styles.statusDot, { backgroundColor: cls.color }]} />
          </View>
        ))}
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.btnVolver} onPress={handleBackAction}>
          <Text style={styles.btnText}>VOLVER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnNuevas} onPress={() => setSubView('browse')}>
          <Text style={styles.btnText}>NUEVAS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Render class search list (CELAR 24)
  const renderBrowse = () => (
    <View style={styles.cardContainer}>
      <View style={styles.titleRow}>
        <Feather name="folder" size={24} color="#1a1a2e" style={styles.titleIcon} />
        <Text style={styles.titleText}>Materias</Text>
      </View>

      <View style={styles.listContainer}>
        {availableClasses.map((cls) => (
          <TouchableOpacity
            key={cls.id}
            activeOpacity={0.8}
            style={styles.listItem}
            onPress={() => handleClassSelect(cls)}
          >
            <View style={styles.listItemLeft}>
              <Feather name="file-text" size={20} color="#8d99ae" style={styles.listIcon} />
              <View style={styles.itemTextContainer}>
                <Text style={styles.itemSubjectText}>{cls.name}</Text>
                <Text style={styles.itemProfessorText}>Profesor: {cls.professor}</Text>
              </View>
            </View>
            <View style={[styles.statusDot, { backgroundColor: cls.color }]} />
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

  // Render join class details (CELAR 25)
  const renderJoinDetail = () => (
    <View style={styles.cardContainer}>
      <View style={styles.titleRow}>
        <Feather name="folder" size={24} color="#1a1a2e" style={styles.titleIcon} />
        <Text style={styles.titleText}>{selectedClass?.name}</Text>
        <View style={[styles.statusDotHeader, { backgroundColor: selectedClass?.color }]} />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.inputLabel}>Profesor</Text>
        <Text style={styles.detailBoxText}>{selectedClass?.professor}</Text>
      </View>

      <View style={styles.rowLayout}>
        <View style={styles.halfWidth}>
          <Text style={styles.inputLabel}>Sección</Text>
          <Text style={styles.detailBoxText}>{selectedClass?.section}</Text>
        </View>
        <View style={styles.halfWidth}>
          <Text style={styles.inputLabel}>Vacantes</Text>
          <Text style={styles.detailBoxText}>{selectedClass?.vacantes} Libres</Text>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.inputLabel}>Descripción</Text>
        <Text style={styles.detailBoxTextArea}>{selectedClass?.desc}</Text>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.btnVolver} onPress={handleBackAction}>
          <Text style={styles.btnText}>VOLVER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnUnirse} onPress={handleJoinClass}>
          <Text style={styles.btnText}>UNIRSE</Text>
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

          {/* Sub-view switcher */}
          {subView === 'list' && renderEnrolled()}
          {subView === 'browse' && renderBrowse()}
          {subView === 'join_detail' && renderJoinDetail()}
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
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  listItemStatic: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingVertical: 12,
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
  itemProfessorText: {
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
  rowLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    width: '100%',
  },
  halfWidth: {
    width: '48%',
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#8d99ae',
    textTransform: 'uppercase',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  detailBoxText: {
    backgroundColor: '#f4f6fc',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1a1a2e',
    fontWeight: '600',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
  },
  detailBoxTextArea: {
    backgroundColor: '#f4f6fc',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 13,
    color: '#1a1a2e',
    fontWeight: '600',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    minHeight: 80,
    lineHeight: 18,
    overflow: 'hidden',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
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
  btnNuevas: {
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
  btnUnirse: {
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
