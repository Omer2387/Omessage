import React from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Button,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ChatScreen({ route }) {
    const { username, messages } = route.params;
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{username}</Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text
            style={[
              styles.message,
              item.sender === 'me' ? styles.myMessage : styles.theirMessage,
            ]}
          >
            {item.text}
          </Text>
        )}
        contentContainerStyle={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput placeholder="Type..." style={styles.input} />
        <Button title="Send" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',          // allow items in a row
    alignItems: 'center',          
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#075E54',
    alignItems: 'center',
  },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' , flex: 1, textAlign: 'center',},
  messageList: { padding: 20 },
  message: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 24,
  },
backButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },

  myMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  theirMessage: {
    backgroundColor: '#EEE',
    alignSelf: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});
