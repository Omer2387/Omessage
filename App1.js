import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./screens/Login";
import Home from './screens/Home';
import ChatScreen from './screens/ChatScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  const [loggedIn, setLoggedIN] = useState(false);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {loggedIn ? (
          <>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Chat" component={ChatScreen} 
          options={{ headerShown: false }} 
          />
          </>
        )
        :
        (
          <Stack.Screen name="Login" >
            {(props) => <Login {...props} setLoggedIN={setLoggedIN} />}
          </Stack.Screen>
        )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
