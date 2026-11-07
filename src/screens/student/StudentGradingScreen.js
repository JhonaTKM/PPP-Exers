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
import { Feather } from '@expo/vector-icons';
import StudentHeader from '../../components/StudentHeader';

export default function StudentGradingScreen({ onBack }) {
  const [gradeView, setGradeView] = useState('subjects'); // 'subjects' | 'detail'
  const [selectedSubject, setSelectedSubject] = useState(null);

  const subjects = [
    { id: 1, name: 'GEOMETRIA', color: '#fc3d39' },
    { id: 2, name: 'ARITMETICA', color: '#ffd166' },
    { id: 3, name: 'ALGEBRA', color: '#7209b7' },
  ];

  const grades = [
    { id: 101, topic: 'Funciones Lineales', student: 'Ricardo Aldair Calderon Flores', score: '18/20' },
    { id: 102, topic: 'Ecuaciones Cuadráticas', student: 'Ricardo Aldair Calderon Flores', score: '20/20' },
  ];

  const handleSubjectSelect = (sub) => {
    setSelectedSubject(sub);
    setGradeView('detail');
  };

  const handleBackAction = () => {
    if (gradeView === 'detail') {
      setGradeView('subjects');
    } else {
      onBack();
    }
  };

  // Renders subject folder files (CELAR 22)
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

  // Renders graded tasks detail (CELAR 27)
  const renderDetail = () => (
    <View style={styles.cardContainer}>
      <View style={styles.titleRow}>
        <Feather name="folder" size={24} color="#1a1a2e" style={styles.titleIcon} />
        <Text style={styles.titleText}>{selectedSubject?.name}</Text>
        <View style={[styles.statusDotHeader, { backgroundColor: selectedSubject?.color }]} />
      </View>

      <View style={styles.listContainer}>
        {grades.map((grade) => (
          <View key={grade.id} style={styles.listItemStatic}>
            <View style={styles.listItemLeft}>
              <Feather name="edit-3" size={18} color="#8d99ae" style={styles.listIcon} />
              <View style={styles.itemTextContainer}>
                <Text style={styles.itemTopicText}>{grade.topic}</Text>
                <Text style={styles.itemStudentText}>{grade.student}</Text>
              </View>
            </View>
            <View style={styles.scoreBadge}>
              <Text style={styles.scoreText}>{grade.score}</Text>
            </View>
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
          {/* Header */}
          <StudentHeader />

          {/* Sub-views */}
          {gradeView === 'subjects' && renderSubjects()}
          {gradeView === 'detail' && renderDetail()}
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
    backgroundColor: '#f4f6fc',
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
  listItemText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1a1a2e',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  itemTopicText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1a1a2e',
  },
  itemStudentText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#8d99ae',
    marginTop: 2,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  scoreBadge: {
    backgroundColor: '#06d6a0', // custom green rating score box from CELAR 27
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    shadowColor: '#06d6a0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  scoreText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '900',
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
  btnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
