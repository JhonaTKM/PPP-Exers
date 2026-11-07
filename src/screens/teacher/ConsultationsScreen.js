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
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import TeacherHeader from '../../components/TeacherHeader';

export default function ConsultationsScreen({ onBack }) {
  const [consultView, setConsultView] = useState('list'); // 'list' | 'detail' | 'chat'
  const [replyText, setReplyText] = useState('');
  const [chatInput, setChatInput] = useState('');
  const scrollViewRef = useRef();

  const threads = [
    {
      id: 1,
      subject: 'GEOMETRIA',
      student: 'Frank Roberto Infante Ramos',
      color: '#fc3d39',
      topic: 'Ángulos Complementarios',
      message: 'Profesor, disculpe la molestia, pero en el ejercicio 3 no comprendo si el ángulo adyacente también se considera suplementario en un plano cartesiano. ¿Me ayuda?',
    },
    {
      id: 2,
      subject: 'ARITMETICA',
      student: 'Rosa Elena Aldave Ramos',
      color: '#ffd166',
      topic: 'Máximo Común Divisor',
      message: 'Buenas tardes profesor. Tengo una consulta sobre el algoritmo de Euclides para el MCD de números de 4 cifras. ¿Siempre es más rápido que factorizar?',
    },
    {
      id: 3,
      subject: 'ALGEBRA',
      student: 'Ricardo Aldair Calderon Flores',
      color: '#7209b7',
      topic: 'Funciones Lineales',
      message: 'Hola profesor. Tengo una duda de cómo determinar la pendiente de la recta cuando pasa por el origen y el segundo cuadrante. ¿Se vuelve negativa?',
    },
  ];

  const [selectedThread, setSelectedThread] = useState(null);

  // Chat thread messages log for the selected consultation
  const [chatHistory, setChatHistory] = useState([
    { id: 1, sender: 'student', text: 'Hola profesor. Tengo una duda de cómo determinar la pendiente de la recta cuando pasa por el origen y el segundo cuadrante. ¿Se vuelve negativa?' },
  ]);

  const handleThreadSelect = (thread) => {
    setSelectedThread(thread);
    setChatHistory([
      { id: 1, sender: 'student', text: thread.message }
    ]);
    setReplyText('');
    setConsultView('detail');
  };

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    
    // Add reply to history
    const newMsg = {
      id: chatHistory.length + 1,
      sender: 'teacher',
      text: replyText,
    };
    setChatHistory(prev => [...prev, newMsg]);
    setReplyText('');
    setConsultView('chat');
  };

  const handleSendChatMessage = () => {
    if (!chatInput.trim()) return;

    const newMsg = {
      id: chatHistory.length + 1,
      sender: 'teacher',
      text: chatInput,
    };
    setChatHistory(prev => [...prev, newMsg]);
    setChatInput('');
    
    // Auto-scroll to bottom of chat
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleBackAction = () => {
    if (consultView === 'chat') {
      setConsultView('detail');
    } else if (consultView === 'detail') {
      setConsultView('list');
    } else {
      onBack();
    }
  };

  // Render inquiries list (CELAR 13)
  const renderList = () => (
    <View style={styles.cardContainer}>
      <View style={styles.titleRow}>
        <Feather name="help-circle" size={24} color="#1a1a2e" style={styles.titleIcon} />
        <Text style={styles.titleText}>Consultas</Text>
      </View>

      <View style={styles.listContainer}>
        {threads.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.8}
            style={styles.listItem}
            onPress={() => handleThreadSelect(item)}
          >
            <View style={styles.listItemLeft}>
              <Feather name="help-circle" size={20} color="#8d99ae" style={styles.listIcon} />
              <View style={styles.itemTextContainer}>
                <Text style={styles.itemSubjectText}>{item.subject}</Text>
                <Text style={styles.itemStudentText}>Para: {item.student}</Text>
              </View>
            </View>
            <View style={[styles.statusDot, { backgroundColor: item.color }]} />
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

  // Render inquiry details response editor (CELAR 17)
  const renderDetail = () => (
    <View style={styles.cardContainer}>
      <View style={styles.titleRow}>
        <Feather name="help-circle" size={24} color="#1a1a2e" style={styles.titleIcon} />
        <Text style={styles.titleText}>{selectedThread?.subject}</Text>
        <View style={[styles.statusDotHeader, { backgroundColor: selectedThread?.color }]} />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.inputLabel}>Tema</Text>
        <Text style={styles.staticBoxText}>{selectedThread?.topic}</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.inputLabel}>Alumno</Text>
        <Text style={styles.staticBoxText}>{selectedThread?.student}</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.inputLabel}>Consulta</Text>
        <Text style={styles.staticBoxTextArea}>{selectedThread?.message}</Text>
      </View>

      {/* Reply input field */}
      <View style={styles.formGroup}>
        <Text style={styles.inputLabel}>Respuesta</Text>
        <View style={styles.replyInputWrapper}>
          <TextInput
            style={styles.replyTextInput}
            placeholder="Escribe tu respuesta aquí..."
            placeholderTextColor="#a0aab8"
            multiline={true}
            numberOfLines={4}
            value={replyText}
            onChangeText={setReplyText}
          />
          <TouchableOpacity style={styles.attachmentIcon}>
            <Feather name="paperclip" size={18} color="#2835FF" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.btnVolver} onPress={handleBackAction}>
          <Text style={styles.btnText}>VOLVER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnEnviar} onPress={handleSendReply}>
          <Text style={styles.btnText}>ENVIAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Render thread message bubbles live screen (CELAR 28)
  const renderChat = () => (
    <View style={styles.cardContainer}>
      <View style={styles.titleRow}>
        <Feather name="message-square" size={24} color="#1a1a2e" style={styles.titleIcon} />
        <Text style={styles.titleText}>{selectedThread?.subject}</Text>
        <View style={[styles.statusDotHeader, { backgroundColor: selectedThread?.color }]} />
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
              msg.sender === 'teacher' ? styles.bubbleWrapperRight : styles.bubbleWrapperLeft,
            ]}
          >
            <View
              style={[
                styles.bubble,
                msg.sender === 'teacher' ? styles.bubbleRight : styles.bubbleLeft,
              ]}
            >
              <Text style={msg.sender === 'teacher' ? styles.bubbleTextRight : styles.bubbleTextLeft}>
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
          placeholder="Escribe..."
          placeholderTextColor="#a0aab8"
          value={chatInput}
          onChangeText={setChatInput}
          onSubmitEditing={handleSendChatMessage}
        />
        <TouchableOpacity style={styles.chatSendBtn} onPress={handleSendChatMessage}>
          <Feather name="send" size={16} color="#ffffff" />
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
          <TeacherHeader />

          {/* Views switch */}
          {consultView === 'list' && renderList()}
          {consultView === 'detail' && renderDetail()}
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
  itemStudentText: {
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
    minHeight: 70,
    lineHeight: 18,
    overflow: 'hidden',
  },
  replyInputWrapper: {
    backgroundColor: '#f4f6fc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    position: 'relative',
  },
  replyTextInput: {
    minHeight: 80,
    paddingHorizontal: 15,
    paddingTop: 12,
    paddingRight: 40,
    fontSize: 14,
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
    height: 160,
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
    paddingLeft: 15,
    paddingRight: 5,
    marginBottom: 15,
  },
  chatInputField: {
    flex: 1,
    fontSize: 13,
    color: '#1a1a2e',
    fontWeight: '600',
    height: '100%',
  },
  chatSendBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2835FF',
    justifyContent: 'center',
    alignItems: 'center',
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
