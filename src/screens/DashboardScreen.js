import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function DashboardScreen({ user, onLogout }) {
  const username = user?.username || 'Usuario';

  const stats = [
    { label: 'Racha', value: '5 Días', icon: 'fire', color: '#ff9f1c' },
    { label: 'Puntos', value: '1,240', icon: 'star', color: '#ffd166' },
    { label: 'Nivel', value: '4 (Expert)', icon: 'trophy', color: '#06d6a0' },
  ];

  const challenges = [
    {
      id: 1,
      title: 'Entrenamiento Diario',
      description: 'Potencia tu memoria y agilidad mental.',
      duration: '10 min',
      difficulty: 'Medio',
      icon: 'brain',
      color: '#00bdff',
    },
    {
      id: 2,
      title: 'Velocidad de Reacción',
      description: 'Mejora la velocidad de procesamiento visual.',
      duration: '5 min',
      difficulty: 'Fácil',
      icon: 'lightning-bolt',
      color: '#ff007f',
    },
    {
      id: 3,
      title: 'Lógica y Patrones',
      description: 'Desafía tu razonamiento abstracto.',
      duration: '15 min',
      difficulty: 'Difícil',
      icon: 'puzzle',
      color: '#7209b7',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121826" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <MaterialCommunityIcons name="brain" size={32} color="#00e5ff" />
          <Text style={styles.headerLogoText}>Exers</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Feather name="log-out" size={22} color="#ff3b30" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Welcome Block */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeLabel}>BIENVENIDO DE VUELTA</Text>
          <Text style={styles.usernameText}>{username}</Text>
          <Text style={styles.motivationalText}>
            ¡Tu cerebro está listo para el entrenamiento de hoy!
          </Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {stats.map((item, idx) => (
            <View key={idx} style={styles.statBox}>
              <MaterialCommunityIcons name={item.icon} size={24} color={item.color} />
              <Text style={styles.statValue}>{item.value}</Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        {/* Daily Progress Radial Mockup */}
        <View style={styles.progressContainer}>
          <Text style={styles.sectionTitle}>Progreso Diario</Text>
          <View style={styles.radialCard}>
            <View style={styles.radialRing}>
              <View style={styles.radialInner}>
                <Text style={styles.radialPercent}>75%</Text>
                <Text style={styles.radialSub}>Completado</Text>
              </View>
            </View>
            <View style={styles.progressStats}>
              <Text style={styles.progressStatTitle}>Desafíos Completados</Text>
              <Text style={styles.progressStatDesc}>3 de 4 completados hoy</Text>
              <View style={styles.barContainer}>
                <View style={[styles.progressBar, { width: '75%' }]} />
              </View>
            </View>
          </View>
        </View>

        {/* Challenges List */}
        <View style={styles.challengesContainer}>
          <Text style={styles.sectionTitle}>Entrenamientos Disponibles</Text>
          {challenges.map((challenge) => (
            <TouchableOpacity key={challenge.id} activeOpacity={0.85} style={styles.challengeCard}>
              <View style={[styles.challengeIconBg, { backgroundColor: challenge.color + '20' }]}>
                <MaterialCommunityIcons name={challenge.icon} size={30} color={challenge.color} />
              </View>
              <View style={styles.challengeInfo}>
                <Text style={styles.challengeTitle}>{challenge.title}</Text>
                <Text style={styles.challengeDesc}>{challenge.description}</Text>
                <View style={styles.challengeTags}>
                  <View style={styles.tag}>
                    <Feather name="clock" size={12} color="#8d99ae" style={styles.tagIcon} />
                    <Text style={styles.tagText}>{challenge.duration}</Text>
                  </View>
                  <View style={styles.tag}>
                    <Feather name="activity" size={12} color="#8d99ae" style={styles.tagIcon} />
                    <Text style={styles.tagText}>{challenge.difficulty}</Text>
                  </View>
                </View>
              </View>
              <Feather name="chevron-right" size={20} color="#8d99ae" style={styles.cardArrow} />
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121826', // Premium dark cybernetic theme for the dashboard
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#1f293d',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLogoText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 1,
    marginLeft: 8,
    fontStyle: 'italic',
  },
  logoutButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#1f293d',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  welcomeCard: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2e3c56',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  welcomeLabel: {
    color: '#00e5ff',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 6,
  },
  usernameText: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 8,
  },
  motivationalText: {
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#2e3c56',
  },
  statValue: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
    marginTop: 8,
    marginBottom: 2,
  },
  statLabel: {
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '600',
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 15,
    letterSpacing: 0.5,
  },
  progressContainer: {
    marginBottom: 25,
  },
  radialCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2e3c56',
  },
  radialRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 6,
    borderColor: '#00bdff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00bdff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
  },
  radialInner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  radialPercent: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
  },
  radialSub: {
    color: '#94a3b8',
    fontSize: 8,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  progressStats: {
    flex: 1,
    marginLeft: 20,
  },
  progressStatTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  progressStatDesc: {
    color: '#94a3b8',
    fontSize: 12,
    marginBottom: 10,
  },
  barContainer: {
    height: 6,
    backgroundColor: '#2e3c56',
    borderRadius: 3,
    width: '100%',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#00bdff',
    borderRadius: 3,
  },
  challengesContainer: {
    marginBottom: 10,
  },
  challengeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2e3c56',
  },
  challengeIconBg: {
    width: 54,
    height: 54,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  challengeInfo: {
    flex: 1,
    marginLeft: 15,
  },
  challengeTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 4,
  },
  challengeDesc: {
    color: '#94a3b8',
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 8,
  },
  challengeTags: {
    flexDirection: 'row',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#161d2d',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  tagIcon: {
    marginRight: 4,
  },
  tagText: {
    color: '#94a3b8',
    fontSize: 10,
    fontWeight: '700',
  },
  cardArrow: {
    marginLeft: 5,
  },
});
