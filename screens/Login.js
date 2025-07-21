import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  SafeAreaView,
} from "react-native";

export default function Login({setLoggedIN}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (password.length < 6)
      tempErrors.password = "Password must be at least 6 characters";
    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleLogin = async () => {
  if (!validate()) return;
  console.log("Validation passed. Sending request to server...");
  try {
    const response = await fetch("https://omer.chipim.com/server/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      Alert.alert("Login Successful", data.message);
      setLoggedIN(true);
    } else {
      Alert.alert("Login Failed", data.message);
    }
  } catch (error) {
    console.error("Login error", error);
    Alert.alert("Error", "Unable to connect to the server.");
  }
};


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Login</Text>

          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            autoCapitalize="none"
            onChangeText={setUsername}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
          />

          {errors.password ? (
            <Text style={styles.error}>{errors.password}</Text>
          ) : null}

          <View style={styles.button}>
            <Button title="Login" onPress={handleLogin} />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    alignSelf: "center",
  },
  input: {
    height: 50,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  error: {
    color: "red",
    marginBottom: 10,
    marginLeft: 5,
  },
  button: {
    marginTop: 10,
  },
});
