import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import TeacherHeader from '../../components/TeacherHeader';

export default function SubjectsScreen({ onBack, onCreateNewSubject, initialSubjects = [] }) {
  const [subView, setSubView] = useState('list'); // 'list' | 'detail' | 'topic'
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  // Default directory items
  const [subjects, setSubjects] = useState(
    initialSubjects.length > 0
      ? initialSubjects
      : [
          { id: 1, name: 'GEOMETRIA', color: '#fc3d39', instructor: 'Rosa Elena', seccion: 'A', aula: 'A-201' },
          { id: 2, name: 'ARITMETICA', color: '#ffd166', instructor: 'Luis Lopez', seccion: 'C', aula: 'B-103' },
          { id: 3, name: 'ALGEBRA', color: '#7209b7', instructor: 'Daniel Lorenzo', seccion: 'B', aula: 'A-102' },
        ]
  );

  const topics = [
    { id: 101, name: 'Funciones Lineales', color: '#7209b7' },
    { id: 102, name: 'Ecuaciones Cuadráticas', color: '#ffd166' },
  ];

  const students = [
    { id: 201, name: 'Ricardo Aldair Calderon Flores', statusColor: '#7209b7' },
    { id: 202, name: 'Esther Elena Lopez Aldave', statusColor: '#fc3d39' },
    { id: 203, name: 'Jhon Frank Infante Ramos', statusColor: '#ffd166' },
  ];

  const handleSubjectSelect = (sub) => {
    setSelectedSubject(sub);
    setSubView('detail');
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setSubView('topic');
  };

  const handleBackAction = () => {
    if (subView === 'topic') {
      setSubView('detail');
    } else if (subView === 'detail') {
      setSubView('list');
    } else {
      onBack();
    }
  };

  // Render directory view (CELAR 7)
  const renderList = () => (
    <View style={styles.cardContainer}>
      <View style={styles.titleRow}>
        <Feather name="folder" size={24} color="#1a1a2e" style={styles.titleIcon} />
        <Text style={styles.titleText}>Materias</Text>
      </View>

      <View style={styles.listContainer}>
        {subjects.map((sub) => (
          <TouchableOpacity
            key={sub.id || sub.name}
            activeOpacity={0.8}
            style={styles.listItem}
            onPress={() => handleSubjectSelect(sub)}
          >
            <View style={styles.listItemLeft}>
              <Feather name="file-text" size={20} color="#8d99ae" style={styles.listFileIcon} />
              <Text style={styles.listItemText}>{sub.name}</Text>
            </View>
            <View style={[styles.statusDot, { backgroundColor: sub.color || '#7209b7' }]} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.btnVolver} onPress={handleBackAction}>
          <Text style={styles.btnText}>VOLVER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnCrear} onPress={onCreateNewSubject}>
          <Text style={styles.btnText}>CREAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Render subject details view (CELAR 18)
  const renderDetail = () => (
    <View style={styles.cardContainer}>
      <View style={styles.titleRow}>
        <Feather name="folder" size={24} color="#1a1a2e" style={styles.titleIcon} />
        <Text style={styles.titleText}>{selectedSubject?.name}</Text>
        <View style={[styles.statusDotHeader, { backgroundColor: selectedSubject?.color }]} />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.inputLabel}>Turno</Text>
        <Text style={styles.detailBoxText}>Mañana</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.inputLabel}>Horario</Text>
        <Text style={styles.detailBoxText}>Lu-Mi 08:00 - 10:00 (Aula {selectedSubject?.aula || 'A-102'})</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.inputLabel}>Descripción</Text>
        <Text style={styles.detailBoxTextArea}>
          Clases enfocadas al desarrollo analítico de problemas del área de {selectedSubject?.name || 'materia'}, reforzando agilidad de patrones e inducción lógica.
        </Text>
      </View>

      <View style={styles.divider} />

      <Text style={styles.sectionSubtitle}>Temas Registrados</Text>
      <View style={styles.listContainer}>
        {topics.map((topic) => (
          <TouchableOpacity
            key={topic.id}
            activeOpacity={0.8}
            style={styles.listItem}
            onPress={() => handleTopicSelect(topic)}
          >
            <View style={styles.listItemLeft}>
              <Feather name="file-text" size={20} color="#8d99ae" style={styles.listFileIcon} />
              <Text style={styles.listItemText}>{topic.name}</Text>
            </View>
            <View style={[styles.statusDot, { backgroundColor: selectedSubject?.color }]} />
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

  // Render topic details view (CELAR 19)
  const renderTopic = () => (
    <View style={styles.cardContainer}>
      <View style={styles.titleRow}>
        <Feather name="file-text" size={24} color="#1a1a2e" style={styles.titleIcon} />
        <Text style={styles.titleText}>{selectedTopic?.name}</Text>
        <View style={[styles.statusDotHeader, { backgroundColor: selectedSubject?.color }]} />
      </View>

      <Text style={styles.sectionSubtitle}>Alumnos en el Tema</Text>
      <View style={styles.listContainer}>
        {students.map((student) => (
          <View key={student.id} style={styles.listItemStatic}>
            <View style={styles.listItemLeft}>
              <Feather name="user" size={18} color="#8d99ae" style={styles.listFileIcon} />
              <Text style={styles.listItemStaticText}>{student.name}</Text>
            </View>
            <View style={[styles.statusDot, { backgroundColor: selectedSubject?.color || '#00e5ff' }]} />
          </View>
        ))}
      </View>

      <View style={styles.actionsRowSingle}>
        <TouchableOpacity style={styles.btnVolver} onPress={handleBackAction}>
          <Text style={styles.btnText}>VOLVER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#2835FF" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Common header */}
          <TeacherHeader />

          {/* Sub-view switcher */}
          {subView === 'list' && renderList()}
          {subView === 'detail' && renderDetail()}
          {subView === 'topic' && renderTopic()}
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
    paddingVertical: 14,
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
  listFileIcon: {
    marginRight: 10,
  },
  listItemText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1a1a2e',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  listItemStaticText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
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
  divider: {
    height: 1,
    backgroundColor: '#f0f3ff',
    marginVertical: 15,
  },
  sectionSubtitle: {
    fontSize: 13,
    fontWeight: '900',
    color: '#1a1a2e',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    marginTop: 5,
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
  btnCrear: {
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
