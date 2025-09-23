import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <LinearGradient colors={["#4a56e2", "#64bae8"]} style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/copia.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Card de login */}
      <LinearGradient
        colors={["#43a4e8", "#314ed9"]}
        style={styles.card}
        // start={{ x: 0, y: 0 }}
        // end={{ x: 1, y: 1 }}
      >
        {/* Usuario */}
        <Text style={styles.label}>Usuario</Text>
        <View style={styles.inputGroup}>
          <FontAwesome name="user" size={18} color="#555" style={styles.icon} />
          <TextInput
            placeholder="Nombre de usuario"
            style={styles.input}
            placeholderTextColor="#888"
          />
        </View>

        {/* Contraseña */}
        <Text style={styles.label}>Contraseña</Text>
        <View style={styles.inputGroup}>
          <FontAwesome name="lock" size={18} color="#555" style={styles.icon} />
          <TextInput
            placeholder="Contraseña"
            secureTextEntry={!showPassword}
            style={styles.input}
            placeholderTextColor="#888"
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeButton}
          >
            <FontAwesome
              name={showPassword ? "eye-slash" : "eye"}
              size={18}
              color="#555"
            />
          </TouchableOpacity>
        </View>

        {/* Botón */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>INGRESAR</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Enlace */}
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>¿Olvidó su contraseña?</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -100,
    marginBottom: 60,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 6,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  card: {
    width: "85%",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 6,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 14,
    color: "#333",
  },
  eyeButton: {
    padding: 5,
  },
  button: {
    backgroundColor: "#1ed760",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 70,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPassword: {
    marginTop: 10,
    color: "#fff",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
