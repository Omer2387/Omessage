import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
} from 'react-native';

const Home = () => {
  const [activeTab, setActiveTab] = useState('chats');
  const [searchText, setSearchText] = useState('');

  // Sample chat data
  const chats = [
    {
      id: 1,
      name: "Sarah Johnson",
      lastMessage: "Hey! How was your day?",
      time: "12:34 PM",
      unread: 2,
      avatar: "SJ",
      online: true
    },
    {
      id: 2,
      name: "Mike Chen",
      lastMessage: "Can we meet tomorrow?",
      time: "11:45 AM",
      unread: 0,
      avatar: "MC",
      online: false
    },
    {
      id: 3,
      name: "Emma Wilson",
      lastMessage: "Thanks for the help!",
      time: "10:22 AM",
      unread: 1,
      avatar: "EW",
      online: true
    },
    {
      id: 4,
      name: "David Brown",
      lastMessage: "See you later 👋",
      time: "Yesterday",
      unread: 0,
      avatar: "DB",
      online: false
    },
    {
      id: 5,
      name: "Lisa Garcia",
      lastMessage: "Perfect! Let's do it",
      time: "Yesterday",
      unread: 0,
      avatar: "LG",
      online: true
    }
  ];

  // Sample group data
  const groups = [
    {
      id: 1,
      name: "Family Group",
      lastMessage: "Mom: Don't forget dinner tomorrow",
      time: "2:15 PM",
      unread: 5,
      avatar: "FG",
      members: 6
    },
    {
      id: 2,
      name: "Work Team",
      lastMessage: "Alex: Meeting at 3 PM",
      time: "1:30 PM",
      unread: 3,
      avatar: "WT",
      members: 12
    },
    {
      id: 3,
      name: "College Friends",
      lastMessage: "You: Great photos from the trip!",
      time: "12:45 PM",
      unread: 0,
      avatar: "CF",
      members: 8
    },
    {
      id: 4,
      name: "Book Club",
      lastMessage: "Jenny: Next meeting is on Friday",
      time: "11:20 AM",
      unread: 1,
      avatar: "BC",
      members: 5
    },
    {
      id: 5,
      name: "Gym Buddies",
      lastMessage: "Tom: Who's coming today?",
      time: "Yesterday",
      unread: 0,
      avatar: "GB",
      members: 4
    }
  ];

  const ChatItem = ({ item }) => {
  const navigation = useNavigation();

  const exampleMessages = [
    { sender: 'me', text: 'Hey, how are you?' },
    { sender: item.name, text: item.lastMessage },
  ];
  return (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() =>
        navigation.navigate('Chat', {
          username: item.name,
          messages: exampleMessages,
        })
      }
    >
      <View style={styles.avatarContainer}>
        <View style={[styles.avatar, styles.chatAvatar]}>
          <Text style={styles.avatarText}>{item.avatar}</Text>
        </View>
        {item.online && <View style={styles.onlineIndicator} />}
      </View>
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.chatTime}>{item.time}</Text>
        </View>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
      {item.unread > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>{item.unread}</Text>
        </View>
      )}
    </TouchableOpacity>
  
  );}

  const GroupItem = ({ item }) => (
    <TouchableOpacity style={styles.chatItem}>
      <View style={styles.avatarContainer}>
        <View style={[styles.avatar, styles.groupAvatar]}>
          <Text style={styles.avatarText}>{item.avatar}</Text>
        </View>
      </View>
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.chatTime}>{item.time}</Text>
        </View>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
      {item.unread > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>{item.unread}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const Header = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Omessage</Text>
      <View style={styles.headerIcons}>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.iconText}>🔍</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.iconText}>⋮</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const SearchBar = () => (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchText}
        onChangeText={setSearchText}
        placeholderTextColor="#999"
      />
    </View>
  );

  const TabBar = () => (
    <View style={styles.tabBar}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'chats' && styles.activeTab]}
        onPress={() => setActiveTab('chats')}
      >
        <Text style={[styles.tabText, activeTab === 'chats' && styles.activeTabText]}>
          CHATS
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'groups' && styles.activeTab]}
        onPress={() => setActiveTab('groups')}
      >
        <Text style={[styles.tabText, activeTab === 'groups' && styles.activeTabText]}>
          GROUPS
        </Text>
      </TouchableOpacity>
    </View>
  );

  const FloatingActionButton = () => (
    <TouchableOpacity style={styles.fab}>
      <Text style={styles.fabText}>💬</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#075E54" barStyle="light-content" />
      <Header />
      <SearchBar />
      <TabBar />
      
      <View style={styles.content}>
        {activeTab === 'chats' ? (
          <FlatList
            data={chats}
            renderItem={({ item }) => <ChatItem item={item} />}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <FlatList
            data={groups}
            renderItem={GroupItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
      
      <FloatingActionButton />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#075E54',
    paddingHorizontal: 16,
    paddingVertical: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  iconText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  searchContainer: {
    backgroundColor: '#F5F5F5',
    margin: 16,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  searchInput: {
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#075E54',
    paddingHorizontal: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#25D366',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#A8D5D1',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatAvatar: {
    backgroundColor: '#4A90E2',
  },
  groupAvatar: {
    backgroundColor: '#25D366',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    backgroundColor: '#25D366',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  chatTime: {
    fontSize: 12,
    color: '#999',
    marginLeft: 8,
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
  unreadBadge: {
    backgroundColor: '#25D366',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    marginLeft: 8,
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#25D366',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
});

export default Home;