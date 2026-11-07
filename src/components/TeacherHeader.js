import React from 'react';
import { StyleSheet, Text, View, Image, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TeacherHeader() {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftCol}>
        {/* Rounded Profile Avatar Circle */}
        <View style={styles.avatarContainer}>
          <MaterialCommunityIcons name="account-tie" size={34} color="#2835FF" />
        </View>
        <View style={styles.infoCol}>
          <Text style={styles.nameText}>Daniel David Lorenzo Ramos</Text>
          <View style={styles.roleRow}>
            <View style={styles.dot} />
            <Text style={styles.roleText}>PROFESOR</Text>
          </View>
        </View>
      </View>
      
      {/* Small brain logo on the right side */}
      <View style={styles.logoCol}>
        <MaterialCommunityIcons name="brain" size={26} color="#00e5ff" style={styles.glowBrain} />
        <Text style={styles.logoText}>Exs</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1.5,
    borderColor: '#e8ecf4',
    marginVertical: 12,
  },
  leftCol: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f3ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1.5,
    borderColor: '#2835FF',
  },
  infoCol: {
    flex: 1,
    justifyContent: 'center',
  },
  nameText: {
    color: '#1a1a2e',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: -0.2,
    lineHeight: 16,
  },
  roleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2835FF',
    marginRight: 6,
  },
  roleText: {
    color: '#2835FF',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  logoCol: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  glowBrain: {
    textShadowColor: '#00e5ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  logoText: {
    color: '#1a1a2e',
    fontSize: 11,
    fontWeight: '900',
    fontStyle: 'italic',
    marginTop: -2,
  },
});
