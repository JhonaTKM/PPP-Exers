import React, { useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Animated, StatusBar, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import TeacherHeader from '../../components/TeacherHeader';

export default function TeacherMenuScreen({ onNavigate, onLogout }) {
  const menuItems = [
    {
      id: 'create_exercise',
      title: 'Crear Ejercicio',
      icon: 'edit',
      color: '#2835FF',
    },
    {
      id: 'subjects',
      title: 'Materias',
      icon: 'folder',
      color: '#2835FF',
    },
    {
      id: 'consultations',
      title: 'Consultas',
      icon: 'help-circle',
      color: '#2835FF',
    },
    {
      id: 'grading',
      title: 'Calificacion',
      icon: 'bar-chart-2',
      color: '#2835FF',
    },
    {
      id: 'settings',
      title: 'Ajustes',
      icon: 'tool', // Wrench/gear style
      color: '#2835FF',
    },
    {
      id: 'logout',
      title: 'Salir',
      icon: 'log-out',
      color: '#fc3d39', // Highlighted exit
    },
  ];

  const handlePress = (id) => {
    if (id === 'logout') {
      if (onLogout) onLogout();
    } else {
      if (onNavigate) onNavigate(id);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2835FF" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Dynamic Teacher Header Card */}
        <TeacherHeader />

        {/* Inner Menu Grid Container */}
        <View style={styles.gridContainer}>
          {menuItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              onPress={() => handlePress(item.id)}
            />
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

// Sub-component for individual interactive menu items with press scale animation
function MenuItemCard({ item, onPress }) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.94,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      tension: 40,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.cardWrapper}
    >
      <Animated.View style={[styles.menuCard, { transform: [{ scale: scale }] }]}>
        <View style={[styles.iconContainer, { backgroundColor: item.color + '12' }]}>
          <Feather name={item.icon} size={36} color={item.color} />
        </View>
        <Text style={[styles.cardTitle, { color: item.id === 'logout' ? '#fc3d39' : '#1a1a2e' }]}>
          {item.title}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2835FF', // Main Teacher electric blue background
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 25,
    justifyContent: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },
  cardWrapper: {
    width: '48%',
    marginVertical: 8,
  },
  menuCard: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    aspectRatio: 1, // Keep it perfectly square
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
    borderWidth: 1.5,
    borderColor: '#e8ecf4',
  },
  iconContainer: {
    width: 68,
    height: 68,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
