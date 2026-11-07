import React, { useState, useRef } from 'react';
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
import StudentHeader from '../../components/StudentHeader';

export default function StudentConsultationsScreen({ onBack }) {
  const [consultView, setConsultView] = useState('list'); // 'list' | 'create' | 'chat'
  
  const [materia, setMateria] = useState('');
  const [tema, setTema] = useState('');
  const [profesor, setProfesor] = useState('');
  const [consulta, setConsulta] = useState('');
  
  const [chatInput, setChatInput] = useState('');
  const scrollViewRef = useRef();

  // My Consultations List (CELAR 26)
  const [myInquiries, setMyInquiries] = useState([
    { id: 1, subject: 'GEOMETRIA', professor: 'Frank Infante Ramos', color: '#fc3d39', topic: 'Ángulos Complementarios', message: 'Duda con la suma de adyacentes.' },
    { id: 2, subject: 'ARITMETICA', professor: 'Rosa Elena Aldave', color: '#ffd166', topic: 'MCD', message: 'Consulta de división euclidiana.' },
    { id: 3, subject: 'ALGEBRA', professor: 'Daniel Lorenzo Ramos', color: '#7209b7', topic: 'Funciones Lineales', message: 'Hola profesor. Tengo una duda de cómo determinar la pendiente de la recta cuando pasa por el origen y el segundo cuadrante. ¿Se vuelve negativa?' },
  ]);

  // Chat messages for selected consultation (CELAR 29)
  const [chatHistory, setChatHistory] = useState([
    { id: 1, sender: 'student', text: 'Hola profesor. Tengo una duda de cómo determinar la pendiente de la recta cuando pasa por el origen y el segundo cuadrante. ¿Se vuelve negativa?' },
    { id: 2, sender: 'teacher', text: 'Hola Thais. Cuando la recta pasa por el origen (0,0) y el segundo cuadrante, el ángulo de inclinación con el eje x positivo es obtuso (mayor a 90°), por lo tanto su tangente es negativa y m < 0.' },
  ]);

  const handleInquirySelect = (item) => {
    setChatHistory([
      { id: 1, sender: 'student', text: item.message },
      { id: 2, sender: 'teacher', text: `Hola Thais. Con gusto te asesoro sobre tu duda de ${item.topic}. ¿En qué paso te encuentras estancada?` }
    ]);
    setConsultView('chat');
  };

  const handleCreateInquiry = () => {
    if (!materia.trim() || !tema.trim() || !profesor.trim() || !consulta.trim()) {
      Alert.alert('Campos vacíos', 'Por favor completa todos los campos del formulario.');
      return;
    }

    Alert.alert(
      '¡Consulta Enviada!',
      'Tu consulta ha sido enviada exitosamente al profesor ' + profesor + '.',
      [
        {
          text: 'Aceptar',
          onPress: () => {
            const newInquiry = {
              id: myInquiries.length + 1,
              subject: materia.toUpperCase(),
              professor: profesor,
              color: '#06d6a0', // green status dot
              topic: tema,
              message: consulta,
            };
            setMyInquiries(prev => [newInquiry, ...prev]);
            
            // Clear inputs
            setMateria('');
            setTema('');
            setProfesor('');
            setConsulta('');
            
            setConsultView('list');
          }
        }
      ]
    );
  };

  const handleSendChatMessage = () => {
    if (!chatInput.trim()) return;

    const newMsg = {
      id: chatHistory.length + 1,
      sender: 'student',
      text: chatInput,
    };
    setChatHistory(prev => [...prev, newMsg]);
    setChatInput('');

    // Mock teacher auto-reply after short delay
    setTimeout(() => {
      const teacherReply = {
        id: chatHistory.length + 2,
        sender: 'teacher',
        text: '¡Entendido! Déjame revisar tus planteamientos para guiarte mejor.',
      };
      setChatHistory(prev => [...prev, teacherReply]);
      
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1500);

    // Auto-scroll
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleBackAction = () => {
    if (consultView === 'chat') {
      setConsultView('list');
    } else if (consultView === 'create') {
      setConsultView('list');
    } else {
      onBack();
    }
  };

  // Renders inquiries directories (CELAR 26)
  const renderList = () => (
    <View style={styles.cardContainer}>
      <View style={styles.titleRow}>
        <Feather name="help-circle" size={24} color="#1a1a2e" style={styles.titleIcon} />
        <Text style={styles.titleText}>Consultas</Text>
      </View>

      <View style={styles.listContainer}>
        {myInquiries.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.8}
            style={styles.listItem}
            onPress={() => handleInquirySelect(item)}
          >
            <View style={styles.listItemLeft}>
              <Feather name="message-square" size={20} color="#8d99ae" style={styles.listIcon} />
              <View style={styles.itemTextContainer}>
                <Text style={styles.itemSubjectText}>{item.subject}</Text>
                <Text style={styles.itemProfessorText}>Profesor: {item.professor}</Text>
              </View>
            </View>
            <View style={[styles.statusDot, { backgroundColor: item.color }]} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.btnVolver} onPress={handleBackAction}>
          <Text style={styles.btnText}>VOLVER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnNueva} onPress={() => setConsultView('create')}>
          <Text style={styles.btnText}>NUEVA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Renders create inquiry form (CELAR 14)
  const renderCreateForm = () => (
    <View style={styles.cardContainer}>
      <View style={styles.titleRow}>
        <Feather name="help-circle" size={24} color="#1a1a2e" style={styles.titleIcon} />
        <Text style={styles.titleText}>Consulta</Text>
      </View>

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
          placeholder="Escribe el tema de consulta..."
          placeholderTextColor="#a0aab8"
          value={tema}
          onChangeText={setTema}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.inputLabel}>Profesor</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Nombre del profesor..."
          placeholderTextColor="#a0aab8"
          value={profesor}
          onChangeText={setProfesor}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.inputLabel}>Consulta</Text>
        <View style={styles.largeInputWrapper}>
          <TextInput
            style={styles.largeTextInput}
            placeholder="Escribe tu consulta o duda aquí..."
            placeholderTextColor="#a0aab8"
            multiline={true}
            numberOfLines={4}
            value={consulta}
            onChangeText={setConsulta}
          />
          <TouchableOpacity style={styles.attachmentIcon}>
            <Feather name="image" size={18} color="#2835FF" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.btnVolver} onPress={handleBackAction}>
          <Text style={styles.btnText}>VOLVER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnEnviar} onPress={handleCreateInquiry}>
          <Text style={styles.btnText}>ENVIAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Renders live conversation thread bubbles (CELAR 29)
  const renderChat = () => (
    <View style={styles.cardContainer}>
      <View style={styles.titleRow}>
        <Feather name="message-square" size={24} color="#1a1a2e" style={styles.titleIcon} />
        <Text style={styles.titleText}>ALGEBRA</Text>
        <View style={styles.statusDotHeader} />
      </View>

      <View style={styles.teacherDetailsBox}>
        <Text style={styles.teacherDetailsText}>Profesor: Daniel David Lorenzo Ramos</Text>
        <Text style={styles.teacherDetailsSub}>Tema: Funciones Lineales</Text>
      </View>

      {/* Chat scroll feed */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.chatScroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.chatScrollContent}
      >
        {chatHistory.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.bubbleWrapper,
              msg.sender === 'student' ? styles.bubbleWrapperRight : styles.bubbleWrapperLeft,
            ]}
          >
            <View
              style={[
                styles.bubble,
                msg.sender === 'student' ? styles.bubbleRight : styles.bubbleLeft,
              ]}
            >
              <Text style={msg.sender === 'student' ? styles.bubbleTextRight : styles.bubbleTextLeft}>
                {msg.text}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Direct inline input bar */}
      <View style={styles.chatInputBar}>
        <TextInput
          style={styles.chatInputField}
          placeholder="escribir..."
          placeholderTextColor="#a0aab8"
          value={chatInput}
          onChangeText={setChatInput}
          onSubmitEditing={handleSendChatMessage}
        />
        <TouchableOpacity style={styles.attachmentIconInChat}>
          <Feather name="image" size={16} color="#8d99ae" />
        </TouchableOpacity>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.btnVolver} onPress={handleBackAction}>
          <Text style={styles.btnText}>VOLVER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnEnviar} onPress={handleSendChatMessage}>
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
          <StudentHeader />

          {/* Sub-view switcher */}
          {consultView === 'list' && renderList()}
          {consultView === 'create' && renderCreateForm()}
          {consultView === 'chat' && renderChat()}
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
    backgroundColor: '#7209b7',
    marginLeft: 10,
  },
  teacherDetailsBox: {
    backgroundColor: '#f4f6fc',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  teacherDetailsText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1a1a2e',
  },
  teacherDetailsSub: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8d99ae',
    marginTop: 2,
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
  textInput: {
    backgroundColor: '#f4f6fc',
    borderRadius: 12,
    height: 42,
    paddingHorizontal: 15,
    fontSize: 13,
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
    position: 'relative',
  },
  largeTextInput: {
    minHeight: 80,
    paddingHorizontal: 15,
    paddingTop: 12,
    paddingRight: 40,
    fontSize: 13,
    color: '#1a1a2e',
    fontWeight: '600',
    textAlignVertical: 'top',
  },
  attachmentIcon: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    padding: 4,
  },
  chatScroll: {
    height: 140,
    backgroundColor: '#f4f6fc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 10,
    marginBottom: 15,
  },
  chatScrollContent: {
    paddingBottom: 10,
  },
  bubbleWrapper: {
    width: '100%',
    marginVertical: 4,
    flexDirection: 'row',
  },
  bubbleWrapperLeft: {
    justifyContent: 'flex-start',
  },
  bubbleWrapperRight: {
    justifyContent: 'flex-end',
  },
  bubble: {
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    maxWidth: '80%',
  },
  bubbleLeft: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  bubbleRight: {
    backgroundColor: '#2835FF',
  },
  bubbleTextLeft: {
    color: '#1a1a2e',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
  },
  bubbleTextRight: {
    color: '#ffffff',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
  },
  chatInputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f6fc',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    height: 40,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  chatInputField: {
    flex: 1,
    fontSize: 13,
    color: '#1a1a2e',
    fontWeight: '600',
    height: '100%',
  },
  attachmentIconInChat: {
    padding: 4,
    marginLeft: 10,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
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
  btnNueva: {
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
