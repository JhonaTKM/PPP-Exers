import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Import Student Screens
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen1 from './src/screens/RegisterScreen1';
import RegisterScreen2 from './src/screens/RegisterScreen2';
import StudentMenuScreen from './src/screens/student/StudentMenuScreen';
import SolveExerciseScreen from './src/screens/student/SolveExerciseScreen';
import StudentSubjectsScreen from './src/screens/student/StudentSubjectsScreen';
import StudentConsultationsScreen from './src/screens/student/StudentConsultationsScreen';
import StudentGradingScreen from './src/screens/student/StudentGradingScreen';
import StudentSettingsScreen from './src/screens/student/StudentSettingsScreen';

// Import Teacher Screens
import TeacherMenuScreen from './src/screens/teacher/TeacherMenuScreen';
import CreateExerciseScreen from './src/screens/teacher/CreateExerciseScreen';
import CreateSubjectScreen from './src/screens/teacher/CreateSubjectScreen';
import SubjectsScreen from './src/screens/teacher/SubjectsScreen';
import ConsultationsScreen from './src/screens/teacher/ConsultationsScreen';
import GradingScreen from './src/screens/teacher/GradingScreen';
import SettingsScreen from './src/screens/teacher/SettingsScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [user, setUser] = useState(null);
  
  // Registration multi-step state persistence
  const [registrationData, setRegistrationData] = useState({});

  // Simulated User Accounts Database
  const [usersDb, setUsersDb] = useState({
    profesor: { username: 'profesor', role: 'Profesor', nombres: 'Daniel David', apellidos: 'Lorenzo Ramos' },
    estudiante: { username: 'estudiante', role: 'Estudiante', nombres: 'Thais Catalina', apellidos: 'Cabello Carrera' }
  });

  // Dynamic subjects list for the teacher
  const [customSubjects, setCustomSubjects] = useState([
    { id: 1, name: 'GEOMETRIA', color: '#fc3d39', instructor: 'Rosa Elena', seccion: 'A', aula: 'A-201' },
    { id: 2, name: 'ARITMETICA', color: '#ffd166', instructor: 'Luis Lopez', seccion: 'C', aula: 'B-103' },
    { id: 3, name: 'ALGEBRA', color: '#7209b7', instructor: 'Daniel Lorenzo', seccion: 'B', aula: 'A-102' },
  ]);

  const handleWelcomeNext = () => {
    setCurrentScreen('login');
  };

  const handleLoginSuccess = (loginInput) => {
    const enteredUsername = loginInput.username.trim().toLowerCase();
    
    // Look up user in simulated database
    const matchedUser = usersDb[enteredUsername];

    if (matchedUser) {
      setUser(matchedUser);
      if (matchedUser.role === 'Profesor') {
        setCurrentScreen('teacher_menu');
      } else {
        setCurrentScreen('student_menu');
      }
    } else {
      // Default fallback for any credentials - logins as student
      const fallbackUser = { username: loginInput.username, role: 'Estudiante' };
      setUser(fallbackUser);
      setCurrentScreen('student_menu');
    }
  };

  const handleRegisterStart = () => {
    setRegistrationData({});
    setCurrentScreen('register_1');
  };

  const handleRegister1Next = (step1Data) => {
    setRegistrationData(prev => ({ ...prev, ...step1Data }));
    setCurrentScreen('register_2');
  };

  const handleRegister2Back = () => {
    setCurrentScreen('register_1');
  };

  const handleRegisterSubmit = (step2Data) => {
    const finalData = { ...registrationData, ...step2Data };
    const newUsername = finalData.nombres.toLowerCase().replace(/\s/g, '');

    // Save registered user into mock database
    const newUser = {
      username: newUsername,
      role: finalData.tipoUsuario, // 'Estudiante' or 'Profesor'
      nombres: finalData.nombres,
      apellidos: finalData.apellidos,
      ciudad: finalData.ciudad,
    };

    setUsersDb(prev => ({
      ...prev,
      [newUsername]: newUser
    }));

    Alert.alert(
      '¡Registro Completado!',
      `Hola ${finalData.nombres || 'Exers'}, tu cuenta con rol de [${finalData.tipoUsuario}] ha sido creada.\n\nPara iniciar sesión usa tu nombre como usuario: "${newUsername}"`,
      [
        {
          text: 'Ir a Iniciar Sesión',
          onPress: () => {
            setCurrentScreen('login');
          }
        }
      ]
    );
  };

  const handleAddNewSubject = (newSub) => {
    setCustomSubjects(prev => [
      ...prev,
      {
        id: prev.length + 1,
        name: newSub.name,
        color: newSub.color,
        instructor: 'Daniel Lorenzo',
        seccion: 'A',
        aula: 'A-105'
      }
    ]);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('login');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      // General Core Screens
      case 'welcome':
        return <WelcomeScreen onNext={handleWelcomeNext} />;
      case 'login':
        return (
          <LoginScreen
            onLoginSuccess={handleLoginSuccess}
            onRegister={handleRegisterStart}
          />
        );
      case 'register_1':
        return (
          <RegisterScreen1
            existingData={registrationData}
            onNext={handleRegister1Next}
            onBack={() => setCurrentScreen('login')}
          />
        );
      case 'register_2':
        return (
          <RegisterScreen2
            onSubmit={handleRegisterSubmit}
            onBack={handleRegister2Back}
          />
        );
      // Student Suite Screens
      case 'student_menu':
        return (
          <StudentMenuScreen
            onNavigate={(screen) => setCurrentScreen(screen)}
            onLogout={handleLogout}
          />
        );
      case 'solve_exercise':
        return <SolveExerciseScreen onBack={() => setCurrentScreen('student_menu')} />;
      case 'student_subjects':
        return <StudentSubjectsScreen onBack={() => setCurrentScreen('student_menu')} />;
      case 'student_consultations':
        return <StudentConsultationsScreen onBack={() => setCurrentScreen('student_menu')} />;
      case 'student_grading':
        return <StudentGradingScreen onBack={() => setCurrentScreen('student_menu')} />;
      case 'student_settings':
        return (
          <StudentSettingsScreen
            onBack={() => setCurrentScreen('student_menu')}
            onLogout={handleLogout}
          />
        );

      // Teacher Suite Screens
      case 'teacher_menu':
        return (
          <TeacherMenuScreen
            onNavigate={(screen) => setCurrentScreen(screen)}
            onLogout={handleLogout}
          />
        );
      case 'create_exercise':
        return <CreateExerciseScreen onBack={() => setCurrentScreen('teacher_menu')} />;
      case 'subjects':
        return (
          <SubjectsScreen
            initialSubjects={customSubjects}
            onCreateNewSubject={() => setCurrentScreen('create_subject')}
            onBack={() => setCurrentScreen('teacher_menu')}
          />
        );
      case 'create_subject':
        return (
          <CreateSubjectScreen
            onAddSubject={handleAddNewSubject}
            onBack={() => setCurrentScreen('subjects')}
          />
        );
      case 'consultations':
        return <ConsultationsScreen onBack={() => setCurrentScreen('teacher_menu')} />;
      case 'grading':
        return <GradingScreen onBack={() => setCurrentScreen('teacher_menu')} />;
      case 'settings':
        return (
          <SettingsScreen
            onBack={() => setCurrentScreen('teacher_menu')}
            onLogout={handleLogout}
          />
        );

      default:
        return <WelcomeScreen onNext={handleWelcomeNext} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2835FF',
  },
});


