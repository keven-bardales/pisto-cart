import { Link } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = () => {
    // Aquí implementarías la lógica de inicio de sesión
    if (username === "usuario" && password === "contraseña") {
      // Lógica de inicio de sesión exitoso
      setError("");
      // Llevar al usuario a la siguiente pantalla, por ejemplo: navigation.navigate('Home');
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput style={styles.input} placeholder="Nombre de Usuario" value={username} onChangeText={(text) => setUsername(text)} />
      <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)} />
      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <View style={styles.signUpSection}>
        <Text style={styles.signUpText}>¿No tienes una cuenta?</Text>
        <TouchableOpacity>
          <Text style={styles.signUpLink}>Regístrate aquí</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity>
          <Link style={styles.signUpLink} href={"/home"}>
            O inicia sin cuenta
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  signInButton: {
    backgroundColor: "#007bff",
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 15,
  },
  signInText: {
    color: "#fff",
    fontWeight: "bold",
  },
  signUpSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signUpText: {
    marginRight: 5,
  },
  signUpLink: {
    color: "#007bff",
    fontWeight: "bold",
  },
});

export default SignIn;
